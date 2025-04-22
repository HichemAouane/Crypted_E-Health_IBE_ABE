from flask import Flask, request, jsonify
from flask_cors import CORS
from flask_pymongo import PyMongo
from bson import ObjectId
from werkzeug.security import generate_password_hash, check_password_hash
import paho.mqtt.client as mqtt
import json
from pymongo import MongoClient
from datetime import datetime
from flask_mqtt import Mqtt
import requests
from charm.toolbox.pairinggroup import PairingGroup, GT, pair, ZR, G1, G2
from charm.schemes.ibenc.ibenc_bf01 import IBE_BonehFranklin
from pymongo import MongoClient
from bson.objectid import ObjectId
import base64
import pickle
from charm.schemes.abenc.abenc_bsw07 import CPabe_BSW07
app = Flask(__name__)
CORS(app)

app.config['MQTT_BROKER_URL'] = 'localhost'  
app.config['MQTT_BROKER_PORT'] = 1883
app.config['MQTT_KEEPALIVE'] = 60
app.config['MQTT_TLS_ENABLED'] = False 
app.config['MQTT_CLEAN_SESSION'] = True
mqtt = Mqtt(app)

app.config["MONGO_URI_INTERFACE"] = "mongodb://localhost:27017/interface_db"
mongo_interface = PyMongo(app, uri=app.config["MONGO_URI_INTERFACE"])
db_signup= mongo_interface.db.User
db_info_medcine= mongo_interface.db.Medecin
db_info_patients = mongo_interface.db.Patient
db_rdv= mongo_interface.db.RendezVous
db_msg= mongo_interface.db.Messagerie
db_consultation= mongo_interface.db.Consultation
db_traitement= mongo_interface.db.Traitement_Patient

subscribed = False 

def encrypt_ibe(request_json):
    try:
        # Connexion MongoDB
        client = MongoClient("mongodb://172.28.112.1:27017/")
        db_interface = client['interface_db']
        patients_col = db_interface['Patient']
        users_col = db_interface['User']
        db_ibe = client['ibe_database']
        messages_col = db_ibe['patient']

        # Récupération de l'_id utilisateur à partir de la requête JSON
        user_id_str = request_json.get("user_id")
        if not user_id_str:
            raise Exception("user_id manquant dans la requête.")

        user_id = ObjectId(user_id_str)
        user = users_col.find_one({'_id': user_id})
        if not user:
            raise Exception(" Utilisateur introuvable.")

        identity = user.get('email')
        if not identity:
            raise Exception(" L'utilisateur n'a pas d'email.")

        print(" Identité (email) utilisée pour IBE:", identity)

        patient = patients_col.find_one({'user_id': user_id_str})
        if not patient:
            raise Exception(" Aucun patient associé à ce user_id.")

        # Initialisation du chiffrement
        group = PairingGroup('SS512')
        ibe = IBE_BonehFranklin(group)

        # Génération des clés
        mpk, msk = ibe.setup()
        private_key = ibe.extract(msk, identity)

        # Champs à chiffrer
        fields_to_encrypt = ['nom', 'prenom', 'sexe', 'contact', 'contacturgence', 'otherDiseases']
        ciphertext_data = {}

        def serialize_element(element):
            """Helper function to serialize different types of elements"""
            try:
                return group.serialize(element)
            except (TypeError, AttributeError):
                if hasattr(element, 'value'):
                    return str(element.value).encode()
                return str(element).encode()

        # Chiffrement des champs
        for field in fields_to_encrypt:
            field_value = patient.get(field, "")
            if field_value:
                field_bytes = field_value.encode('utf-8') if isinstance(field_value, str) else str(field_value).encode('utf-8')
                ciphertext = ibe.encrypt(mpk, identity, field_bytes)

                ciphertext_data[field] = {
                    'U': base64.b64encode(group.serialize(ciphertext['U'])).decode(),
                    'V': base64.b64encode(serialize_element(ciphertext['V'])).decode(),
                    'W': base64.b64encode(serialize_element(ciphertext['W'])).decode()
                }

        # Sérialisation des clés publiques et secrètes
        def serialize_mpk(mpk_obj):
            """Special handling for master public key serialization"""
            serialized = {}
            for key, value in mpk_obj.items():
                try:
                    serialized[key] = base64.b64encode(group.serialize(value)).decode()
                except (TypeError, AttributeError):
                    serialized[key] = base64.b64encode(str(value).encode()).decode()
            return serialized

        # 📤 Enregistrement des données chiffrées dans MongoDB
        data_to_store = {
            'identity': identity,
            'user_id': str(user_id),
            'patient_id': str(patient['_id']),
            'ciphertext': ciphertext_data,
            'mpk': serialize_mpk(mpk),
            'msk': base64.b64encode(str(msk).encode()).decode()  # Simplified for demo
        }

        # Enregistrer dans MongoDB
        messages_col.insert_one(data_to_store)
        print(" Données du patient chiffrées et stockées dans ibe_database > messages")

    except Exception as e:
        print(f" Erreur : {str(e)}")
    finally:
        client.close()
def encrypt_abe(request_json):
    try:
        # Connexion à MongoDB
        client = MongoClient("mongodb://172.28.112.1:27017/")
        db_encrypted = client["ibe_database"]
        collection_er = db_encrypted["RendezVous"]

        # Initialisation du groupe et du schéma ABE
        group = PairingGroup('SS512')
        abe = CPabe_BSW07(group)

        # Génération des clés publiques et secrètes
        public_key, master_secret_key = abe.setup()

        # Fonction pour chiffrer les données
        def encrypt_data_abe(data):
            # Récupérer les attributs (exemple ici : 'Motif' et 'statut')
            attribut_1 = data.get('Motif', '').upper()
            attribut_2 = data.get('statut', '').upper()

            # Générer les clés ABE
            attributes = [attribut_1, attribut_2]
            private_key = abe.keygen(public_key, master_secret_key, attributes)

            # Message à chiffrer
            message_str = data.get('message', "please SPEEEEED")  # Remplacer par un message réel si nécessaire
            message_G1 = group.hash(message_str, G1)
            message_GT = pair(message_G1, public_key['g2'])

            # Définir la politique d'accès
            policy = f'{attribut_1} AND {attribut_2}'

            # Chiffrement
            ciphertext = abe.encrypt(public_key, message_GT, policy)

            # Sérialisation du message chiffré
            def serialize_element(element, group):
                if group.ismember(element):
                    return base64.b64encode(group.serialize(element)).decode('utf-8')
                return element

            ciphertext_serialized = {k: serialize_element(v, group) for k, v in ciphertext.items()}

            return ciphertext_serialized

        # Récupérer les données du rendez-vous à partir de request.json
        rendezvous_data = request_json.get('rendezvous_data', {})
        if not rendezvous_data:
            raise Exception(" Données du rendez-vous manquantes dans la requête.")

        # Chiffrement des données
        ciphertext_data = encrypt_data_abe(rendezvous_data)

        # Enregistrement des données chiffrées dans MongoDB
        data_to_store = {
            'rendezvous_data': ciphertext_data,
            'original_data': rendezvous_data  # Si nécessaire, garder une trace des données originales
        }

        # Insérer les données chiffrées dans MongoDB
        collection_er.insert_one(data_to_store)
        print(" Rendez-vous chiffré et stocké dans la base de données.")

    except Exception as e:
        print(f" Erreur : {str(e)}")
    finally:
        client.close()


def decrypt_ibe(request_json):
    try:
        # Connexion MongoDB
        client = MongoClient("mongodb://172.28.112.1:27017/")
        db_ibe = client['ibe_database']
        messages_col = db_ibe['tests']

        # Récupération de l'user_id depuis la requête
        user_id_str = request_json.get("user_id")
        if not user_id_str:
            raise Exception(" user_id manquant dans la requête.")

        # Rechercher les données chiffrées du patient
        encrypted_record = messages_col.find_one({'user_id': user_id_str})
        if not encrypted_record:
            raise Exception(" Aucune donnée chiffrée trouvée pour ce user_id.")

        # Initialisation du schéma IBE
        group = PairingGroup('SS512')
        ibe = IBE_BonehFranklin(group)

        # Récupération des clés
        mpk_serialized = encrypted_record['mpk']
        msk_serialized = base64.b64decode(encrypted_record['msk']).decode()
        identity = encrypted_record['identity']
        ciphertext_data = encrypted_record['ciphertext']

        # Désérialisation de mpk
        def deserialize_mpk(mpk_dict):
            deserialized = {}
            for key, value in mpk_dict.items():
                deserialized[key] = group.deserialize(base64.b64decode(value))
            return deserialized

        mpk = deserialize_mpk(mpk_serialized)

        # ATTENTION : ici, la clé msk a été sérialisée simplement avec str(), ce qui n'est **pas sûr**
        # Il faut avoir la vraie structure msk pour fonctionner correctement.
        # Pour test uniquement, on régénère les clés comme au chiffrement :
        mpk, msk = ibe.setup()  # Remplacer ceci par un vrai stockage/chargement sécurisé de msk

        # Génération de la clé privée
        private_key = ibe.extract(msk, identity)

        # Déchiffrement
        decrypted_data = {}
        for field, ct in ciphertext_data.items():
            ciphertext = {
                'U': group.deserialize(base64.b64decode(ct['U'])),
                'V': group.deserialize(base64.b64decode(ct['V'])),
                'W': group.deserialize(base64.b64decode(ct['W']))
            }
            decrypted_bytes = ibe.decrypt(mpk, private_key, ciphertext)
            decrypted_data[field] = decrypted_bytes.decode('utf-8')

        print(" Données déchiffrées :", decrypted_data)
        return decrypted_data

    except Exception as e:
        print(f" Erreur lors du déchiffrement : {str(e)}")
        return {}
    finally:
        client.close()


def decrypt_abe(request_json):
    try:
        # Connexion à MongoDB
        client = MongoClient("mongodb://192.168.100.74:27017/")
        db_encrypted = client["test"]
        collection_er = db_encrypted["RendezVous"]

        # Initialisation du groupe et du schéma ABE
        group = PairingGroup('SS512')
        abe = CPabe_BSW07(group)

        # Génération des mêmes clés ( Doit être remplacé par une vraie récupération des clés persistées)
        public_key, master_secret_key = abe.setup()

        # Récupération des attributs utilisateur pour générer la clé privée
        attributs_utilisateur = request_json.get('attributes', [])
        if not attributs_utilisateur:
            raise Exception(" Attributs utilisateur manquants pour la génération de la clé privée.")

        # Générer la clé privée à partir des attributs
        private_key = abe.keygen(public_key, master_secret_key, attributs_utilisateur)

        # Récupération du document chiffré
        doc = collection_er.find_one({}, sort=[('_id', -1)])  # Dernier document ajouté
        if not doc:
            raise Exception(" Aucun rendez-vous chiffré trouvé.")

        ciphertext_serialized = doc['rendezvous_data']

        # Désérialisation du ciphertext
        def deserialize_element(serialized):
            return group.deserialize(base64.b64decode(serialized))

        ciphertext = {k: deserialize_element(v) for k, v in ciphertext_serialized.items()}

        # Déchiffrement
        decrypted_message = abe.decrypt(public_key, private_key, ciphertext)

        # Conversion en string si possible
        if hasattr(decrypted_message, 'decode'):
            message = decrypted_message.decode('utf-8')
        else:
            message = str(decrypted_message)

        print(" Message déchiffré :", message)
        return message

    except Exception as e:
        print(f" Erreur lors du déchiffrement : {str(e)}")
        return None
    finally:
        client.close()


@mqtt.on_connect()
def handle_connect(client, userdata, flags, rc):
    global subscribed
    print("Connected to MQTT Broker!")

    if not subscribed:  
        mqtt.subscribe("chat/#")
        subscribed = True 


@mqtt.on_message()
def handle_message(client, userdata, message):
    try:
        received_message = json.loads(message.payload.decode())
        print(f"MQTT Message received: {received_message}") 


        result = db_msg.insert_one({
            "expediteur_id": received_message["expediteur_id"],
            "destinataire_id": received_message["destinataire_id"],
            "contenu": received_message["contenu"], 
            "statut": received_message.get("statut", ""),
            "date_heure": datetime.utcnow()
        })

        print("Message saved to MongoDB successfully!")  
    except Exception as e:
        print("Error handling MQTT message:", e)  

    



@app.route('/send', methods=['POST'])
def send_message():
    data = request.get_json()
    print("Received message data:", data) 
    
    if not data or "contenu" not in data or not data["contenu"].strip():
        return jsonify({"error": "No message provided"}), 400
    
    message_obj = {
        "expediteur_id": data["expediteur_id"],
        "destinataire_id": data["destinataire_id"],
        "contenu": data["contenu"],
        "statut": data.get("statut", ""),
        "date_heure": datetime.utcnow().isoformat(),
    }

    topic = f"chat/{data['expediteur_id']}/{data['destinataire_id']}"
    mqtt.publish(topic, json.dumps(message_obj))

   
    

    return jsonify({"status": "Message sent!"})


@app.route('/messages', methods=['GET'])
def get_messages():
    expediteur_id = request.args.get("expediteur_id")
    destinataire_id = request.args.get("destinataire_id")

    if not expediteur_id or not destinataire_id:
        return jsonify({"error": "expediteur_id and destinataire_id are required"}), 400

    messages = list(db_msg.find({
        "$or": [
            {"expediteur_id": expediteur_id, "destinataire_id": destinataire_id},
            {"expediteur_id": destinataire_id, "destinataire_id": expediteur_id}
        ]
    }, {"_id": 0}))

    return jsonify(messages)

@app.route('/signupboth', methods=['POST'])
def register_patient():
    data = request.json 
    if db_signup.find_one({"email": data["email"]}):
        return jsonify({"error": "L'email existe déjà"}), 400

    data["password"] = generate_password_hash(data["password"])
    user_id=db_signup.insert_one(data)  
    return jsonify({"message": "Registration successful!","user_id":str(user_id.inserted_id),"user_email":data["email"]}), 201



@app.route('/loginboth', methods=['POST'])
def login_patient():
    data = request.json
    user = db_signup.find_one({"email": data["email"]})
    
    if not user:
        return jsonify({"error": "Identifiants incorrects"}), 401
    
    user_id = str(user["_id"])
    
    if not check_password_hash(user["password"], data["password"]):
        return jsonify({"error": "Identifiants incorrects"}), 401
    
    # Initialize default values
    profile_info = None
    profile_id = ""
    profile_firstname = ""
    profileinformation = ""
    
    # Check if user is a doctor
    if db_info_medcine.find_one({"user_id": user_id}):
        profile_info = db_info_medcine.find_one({"user_id": user_id})
        profile_id = str(profile_info["_id"])
        profile_firstname = profile_info["nom"]
        profileinformation = profile_info.get("specialite", "")  # Doctor-specific field
    else:
        # Assume user is a patient if not a doctor
        profile_info = db_info_patients.find_one({"user_id": user_id})
        if profile_info:
            profile_id = str(profile_info["_id"])
            profile_firstname = profile_info["nom"]
            profileinformation = profile_info.get("contact", "")  # Patient-specific field
        else:
            return jsonify({"error": "Profil utilisateur non trouvé"}), 404
    
    return jsonify({
        "message": "Connexion réussie!",
        "user_id": user_id,
        "profile_id": profile_id,
        "user_email": user["email"],
        "nom": profile_firstname,
        "role": user["role"],
        "profileinformation": profileinformation
    }), 200



@app.route('/userinfopat', methods=['POST'])
def userinfo_patient():
    data = request.json 
    encrypt_ibe(data)
    profile_id=db_info_patients.insert_one(data)
    return jsonify({"message": "Inscription réussie!","nom":data["nom"],"profile_id":str(profile_id.inserted_id)}), 201


@app.route('/userinfomed', methods=['POST'])
def userinfo_medcine():
    data = request.json.copy() 

  
    if "Hopitalprincipale" in data:
        data.setdefault("hopital", []).append(data["Hopitalprincipale"])
        del data["Hopitalprincipale"]  
    
    if "Willayaprincipale" in data:
        data.setdefault("willaya", []).append(data["Willayaprincipale"])
        del data["Willayaprincipale"] 
    
    if "Communeprincipale" in data:
        data.setdefault("commune", []).append(data["Communeprincipale"])
        del data["Communeprincipale"]


    profile_id = db_info_medcine.insert_one(data)

    return jsonify({"message": "Inscription réussie!", "nom": data["nom"], "profile_id": str(profile_id.inserted_id)}), 201



@app.route('/update-photo', methods=['POST'])
def update_photo():
    data = request.json
    profile_id = data.get("profile_id")
    new_image = data.get("image")
    account_type = data.get("role")

    if not profile_id or not new_image:
        return jsonify({"error": "Profile ID and new image are required"}), 400
    
    try:
       
        collection = db_info_medcine if account_type == "Medecin" else db_info_patients
        print(f"Updating photo for Profile ID: {profile_id}, Type: {account_type}")

      
        result = collection.update_one(
            {"_id": ObjectId(profile_id)},
            {"$set": {"photo": new_image}}
        )

        if result.modified_count > 0:
            return jsonify({"message": "Photo updated successfully", "imageUrl": new_image}), 200
        else:
            return jsonify({"error": "No changes made. Profile ID may be incorrect."}), 400

    except Exception as e:
        return jsonify({"error": str(e)}), 500

    

@app.route('/update-user', methods=['POST'])
def update_user():
    data = request.json
    profile_id = data.get("profile_id")

    if not profile_id:
        return jsonify({"error": "Profile ID is required"}), 400

    update_fields = {}  
    email_changed = False  

    if "contact" in data and data["contact"]:
        update_fields["contact"] = data["contact"]

    if "contacturgence" in data and data["contacturgence"]:
        update_fields["contacturgence"] = data["contacturgence"]

    try:
        profile_info = db_info_patients.find_one({"_id": ObjectId(profile_id)}) or \
                       db_info_medcine.find_one({"_id": ObjectId(profile_id)})

        if not profile_info:
            return jsonify({"error": "Profile not found"}), 404

        account_id = profile_info["user_id"]

        if update_fields:
            db_info_patients.update_one({"_id": ObjectId(profile_id)}, {"$set": update_fields})
            db_info_medcine.update_one({"_id": ObjectId(profile_id)}, {"$set": update_fields})

        if "email" in data and data["email"]:
            user_account = db_signup.find_one({"_id": ObjectId(account_id)})

            if user_account and user_account["email"] != data["email"]:
                db_signup.update_one({"_id": ObjectId(account_id)}, {"$set": {"email": data["email"]}})
                email_changed = True

        return jsonify({"message": "Profile updated successfully!", "logout": email_changed}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


from bson.errors import InvalidId

@app.route('/get-user-info', methods=['GET'])
def get_user_info():
    profile_id = request.args.get("profile_id")

    if not profile_id:
        return jsonify({"error": "Profile ID is required"}), 400

    try:

        try:
            obj_id = ObjectId(profile_id)
        except InvalidId:
            return jsonify({"error": "Invalid Profile ID format"}), 400

        
        user_info = db_info_patients.find_one({"_id": obj_id}) or db_info_medcine.find_one({"_id": obj_id})

        if not user_info:
            return jsonify({"error": "User not found"}), 404

    
        user_account = db_signup.find_one({"_id": ObjectId(user_info["user_id"])}, {"email": 1})

        user_info.pop("_id", None)
        user_info["email"] = user_account["email"] if user_account else "No email found"

        return jsonify(user_info), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



@app.route("/get_medics", methods=["GET"])
def get_medics():
    current_medic_id = request.args.get("medic_id")    

    query_filter = {}
    if current_medic_id:
        try:
            query_filter["_id"] = {"$ne": ObjectId(current_medic_id)}
        except:
            return jsonify({"error": "Invalid profile_id"}), 400 

    medics = list(db_info_medcine.find(query_filter, {"nom": 1}))
    
    formatted_medics = [
        {"profile_id": str(medic["_id"]), "name": medic.get("nom", "Unknown")}
        for medic in medics
    ]
    
    return jsonify(formatted_medics)


@app.route("/get_pats", methods=["GET"])
def get_pats():
    pats = list(db_info_patients.find({}, {"nom": 1}))
    formatted_pats = [{"profile_id": str(pat["_id"]), "name": pat.get("nom", "Unknown")} for pat in pats]
    return jsonify(formatted_pats)


@app.route("/get_pats_for_meds", methods=["GET"])
def get_pats_for_meds():
    
    medic_id = request.args.get("medic_id")
    
    if not medic_id:
        return jsonify({"error": "Medic ID is required"}), 400
    

    medic = db_info_medcine.find_one({"_id": ObjectId(medic_id)}, {"patients": 1})
    
    if not medic:
        return jsonify({"error": "Medic not found"}), 404
    
    
    patient_ids = [ObjectId(pid) for pid in medic.get("patients", [])]

    pats = list(db_info_patients.find({"_id": {"$in": patient_ids}}, {"nom": 1}))
    

    formatted_pats = [{"profile_id": str(pat["_id"]), "name": pat.get("nom", "Unknown")} for pat in pats]
    
    return jsonify(formatted_pats)


@app.route("/get_med_for_patient", methods=["GET"])
def get_self_medics():
    patient_id = request.args.get("patient_id")
    if not patient_id:
        return jsonify({"error": "Missing patient_id"}), 400
    
    patient = db_info_patients.find_one({"_id": ObjectId(patient_id)}, {"medecins": 1})
    print("hhhhhhhhhhhahaaa:",patient)
    if not patient:
        return jsonify({"error": "Patient not found"}), 404
    
    medecin_ids = patient.get("medecins", [])
    print("dsqdsqdsqhahaaadqdsqdsq:",medecin_ids)
    medecin_ids = [ObjectId(med_id) for med_id in medecin_ids]
    print("dsqdsqdsqhahaaadqdsqdsq:",medecin_ids)
    medecins = list(db_info_medcine.find({"_id": {"$in": medecin_ids}}, {"_id": 1, "nom": 1, "specialite": 1}))
    print("zzzzzzzzzzaaadqdsqdsqzz:",medecins)
    formatted_medics = [
        {"profile_id": str(medic["_id"]), "name": medic.get("nom", "Unknown")}
        for medic in medecins
    ]
    return jsonify(formatted_medics)


@app.route("/search", methods=["GET"])
def search_users():
    role = request.args.get("role", "").strip().lower()
    query = request.args.get("query", "").strip()
    willaya = request.args.get("willaya", "").strip()
    commune = request.args.get("commune", "").strip()
    sexe = request.args.get("sexe", "").strip()
    specialite = request.args.get("specialite", "").strip()
    patient_id = request.args.get("patient_id", "").strip()
    medecin_id = request.args.get("medecin_id", "").strip()

    if role not in ["patient", "medecin"]:
        return jsonify({"error": "Invalid role"}), 400


    db_collection = db_info_patients if role == "patient" else db_info_medcine

    search_criteria = {}

    if query:
        regex_query = {"$regex": query, "$options": "i"}
        search_criteria["$or"] = [
            {"nom": regex_query},
            {"prenom": regex_query},
            {"$expr": {
                "$regexMatch": {
                    "input": {"$concat": ["$nom", " ", "$prenom"]},
                    "regex": query,
                    "options": "i"
                }
            }}
        ]

    if willaya:
        search_criteria["willaya"] = willaya
    if commune:
        search_criteria["commune"] = commune
    if sexe:
        search_criteria["sexe"] = sexe
    if specialite:
        search_criteria["specialite"] = specialite

    results = list(db_collection.find(search_criteria))


    associated_users = set()
    if patient_id and role == "medecin":
        patient = db_info_patients.find_one({"_id": ObjectId(patient_id)}, {"medecins": 1})
        if patient and "medecins" in patient:
            associated_users = {str(med_id) for med_id in patient["medecins"]}

    if medecin_id and role == "patient":
        medecin = db_info_medcine.find_one({"_id": ObjectId(medecin_id)}, {"patients": 1})
        if medecin and "patients" in medecin:
            associated_users = {str(pat_id) for pat_id in medecin["patients"]}

    users = [{
        "profile_id": str(user["_id"]),
        "nom": user["nom"],
        "prenom": user["prenom"],
        "willaya": user.get("willaya", ""),
        "commune": user.get("commune", ""),
        "sexe": user.get("sexe", ""),
        "specialite": user.get("specialite", ""),
        "is_associated": str(user["_id"]) in associated_users
    } for user in results]

    return jsonify(users)



@app.route("/randez-vous", methods=["POST"])
def create_rdv():
    try:
        data = request.json


        # Insérer les données dans la collection des rendez-vous (non chiffrées)
        db_rdv.insert_one(data)

        encrypted_data = encrypt_data_abe(data)

        # Insérer les données chiffrées dans la base de données de données cryptées
        result = collection_er.insert_one({"ciphertext": encrypted_data, "public_key": serialize_element(public_key, group), "msk": serialize_element(master_secret_key, group)})

        return jsonify({"message": "Rendez-vous chiffré et enregistré avec succès"}), 201

    except Exception as e:
        print("Erreur:", e)
        return jsonify({"error": "Une erreur est survenue"}), 500


@app.route("/find/rendezvous", methods=["GET"])
def get_rendezvous():
    medecin_id = request.args.get("medecin_id")
    date_rv = request.args.get("date_rv")
    type_consultation = request.args.get("type_consultation")
    
    print("foundyou1",medecin_id ,"foundyou2",date_rv ,"foundyou3",type_consultation)

    if not medecin_id or not date_rv or not type_consultation:
        return jsonify({"message": "Missing parameters"}), 400

    rendezvous = db_rdv.find({
        "medecin_id": medecin_id,
        "daterdv": date_rv,
        "TypeDeConsultation": type_consultation,
        "statut": "accepté",
    })
    
    unique_patients = set()
    patients = []

    for rv in rendezvous:
        patient_id = rv["patient_id"]
        if patient_id not in unique_patients:
            unique_patients.add(patient_id)
            patient_info = db_info_patients.find_one({"_id": ObjectId(patient_id)})
            if patient_info:
                patients.append(patient_info)

    return jsonify({"patients": patients})


@app.route("/find/rendezvous/patient/side", methods=["GET"])
def get_rendezvous_patient_side():
    patient_id = request.args.get("patient_id")
    date_rv = request.args.get("date_rv")
    type_consultation = request.args.get("type_consultation")

    print("foundyou1",patient_id ,"foundyou2",date_rv ,"foundyou3",type_consultation)

    if not patient_id or not date_rv or not type_consultation:
        return jsonify({"message": "Missing parameters"}), 400

    rendezvous = db_rdv.find({
        "patient_id": patient_id,
        "daterdv": date_rv,
        "TypeDeConsultation": type_consultation,
        "statut": "accepté",
    })
    
    unique_medecins = set()
    medecins = []

    for rv in rendezvous:
        medecin_id = rv["medecin_id"]
        if medecin_id not in unique_medecins:
            unique_medecins.add(medecin_id)
            medecin_info = db_info_medcine.find_one({"_id": ObjectId(medecin_id)})
            if medecin_info:
                medecins.append(medecin_info)

    return jsonify({"patients": medecins})


@app.route('/randez-vous-recep', methods=['GET'])
def get_rdvrecep():
    medecin_id = request.args.get('medecin_id')

    if not medecin_id:
        return jsonify({"error": "Missing medecin_id"}), 400


    try:
        medecin_obj_id = ObjectId(medecin_id)
    except:
        return jsonify({"error": "Invalid medecin_id"}), 400


    rdvs = list(db_rdv.find({"medecin_id": medecin_id, "statut": "En Attente"}, {'_id': 1,'patient_id': 1, 'medecin_id': 1, 'daterdv': 1,'statut': 1, 'Motif': 1,'demande_par_patient': 1, 'TypeDeRdv': 1, 'TypeDeConsultation': 1}))

    medecin_info = db_info_medcine.find_one({"_id": medecin_obj_id}, {'_id': 0})

    for rdv in rdvs:
        patient_info = db_info_patients.find_one(
        {"_id": ObjectId(rdv['patient_id'])}, 
        {'_id': 0}
    )
        rdv['patient'] = patient_info

    for rdv in rdvs:
        rdv['medecin'] = medecin_info
    return jsonify(rdvs)



@app.route('/rendez-vous-medecin', methods=['GET'])
def get_accepted_medecin_rendezvous():
    medecin_id = request.args.get("medecin_id")
    
    if not medecin_id:
        return jsonify({"error": "Missing medecin_id"}), 400
    

    rdvs = list(db_rdv.find({"medecin_id": medecin_id, "statut": "accepté"}))
    for rdv in rdvs:
        patient_info = db_info_patients.find_one(
        {"_id": ObjectId(rdv['patient_id'])}, 
        {'_id': 0}
    )
        rdv['patient'] = patient_info

    for rdv in rdvs:
        rdv["_id"] = str(rdv["_id"]) 
    
    return jsonify(rdvs)



@app.route('/randez-vous-recep/<rdv_id>/accept', methods=['PUT'])
def accept_rdv(rdv_id):
    data = request.json

    rdv = db_rdv.find_one({"_id": ObjectId(rdv_id)})

    if not rdv:
        return jsonify({"error": "Rendez-vous non trouvé"}), 404
    
    patient_id = rdv.get("patient_id")
    medecin_id = rdv.get("medecin_id")

    if not patient_id or not medecin_id:
        return jsonify({"error": "Données manquantes dans le rendez-vous"}), 400

    updated_fields = {
        "statut": "accepté",
        "daterdv": data.get("chosenDates"), 
        "heurerdv":data.get("heurerdv"),
        "hopitalrdv":data.get("hopitalrdv"),
    }

    result = db_rdv.update_one({"_id": ObjectId(rdv_id)}, {"$set": updated_fields})

    if result.modified_count == 0:
        return jsonify({"error": "Aucune mise à jour effectuée"}), 400

    db_info_medcine.update_one(
        {"_id": ObjectId(medecin_id)},
        {"$addToSet": {"patients": patient_id}}
    )

    db_info_patients.update_one(
        {"_id": ObjectId(patient_id)},
        {"$addToSet": {"medecins": medecin_id}}
    )

    return jsonify({"message": "Rendez-vous accepté et patient ajouté au médecin"}), 200

@app.route('/randez-vous-recep/<rdv_id>/refuse', methods=['PUT'])
def refuse_rdv(rdv_id):
    result = db_rdv.update_one({"_id": ObjectId(rdv_id)}, {"$set": {"statut": "Refusé"}})

    if result.modified_count > 0:
        return jsonify({"message": "Rendez-vous Refusé"}), 200
    else:
        return jsonify({"error": "Aucune mise à jour effectuée"}), 400



@app.route('/rendez-vous-patient', methods=['GET'])
def get_accepted_patient_rendezvous():
    patient_id = request.args.get("patient_id")

    if not patient_id:
        return jsonify({"error": "Missing patient_id"}), 400


    rdvs = list(db_rdv.find({"patient_id": patient_id, "statut": "accepté"}))

    for rdv in rdvs:
        medecin_info = db_info_medcine.find_one(
        {"_id": ObjectId(rdv['medecin_id'])}, 
        {'_id': 0}
    )
        rdv['medecin'] = medecin_info



    for rdv in rdvs:
        rdv["_id"] = str(rdv["_id"])
    
    return jsonify(rdvs)


@app.route('/rendez-vous-en-attente-refuse', methods=['GET'])
def get_pending_rendezvous():
    patient_id = request.args.get("patient_id")

    if not patient_id:
        return jsonify({"error": "Missing patient_id"}), 400


    rdvs = list(db_rdv.find({"patient_id": patient_id, "statut": {"$in": ["En Attente", "Refusé"]}}))

    for rdv in rdvs:
        medecin_info = db_info_medcine.find_one(
        {"_id": ObjectId(rdv['medecin_id'])}, 
        {'_id': 0}
    )
        rdv['medecin'] = medecin_info


    for rdv in rdvs:
        rdv["_id"] = str(rdv["_id"])
    
    return jsonify(rdvs)

@app.route('/rendez-vous/<rdv_id>/update', methods=['PUT'])
def update_rdv(rdv_id):
    try:
        data = request.json
        update_fields = {}

        
        if "daterdv" in data:
            update_fields["daterdv"] = data["daterdv"]
        if "heurerdv" in data:
            update_fields["heurerdv"] = data["heurerdv"]
        if "hopitalrdv" in data:
            update_fields["hopitalrdv"] = data["hopitalrdv"]

        if not update_fields:
            return jsonify({"error": "No valid fields provided for update"}), 400

        result = db_rdv.update_one({"_id": ObjectId(rdv_id)}, {"$set": update_fields})

        if result.modified_count == 0:
            return jsonify({"error": "No changes made or invalid appointment ID"}), 400

        return jsonify({"message": "Rendez-vous updated successfully"}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500


@app.route("/consultations", methods=["POST"])
def create_consultation():
    try:
        data = request.json
        patient_id = data.get("patient_id")
        medecin_id = data.get("medecin_id")

        if not patient_id or not medecin_id:
            return jsonify({"error": "Missing required fields"}), 400


        consultation = {
            "patient_id": patient_id,
            "medecin_id": medecin_id,
            "date": datetime.utcnow(),
        }


        inserted_consultation = db_consultation.insert_one(consultation)


        return jsonify({"_id": str(inserted_consultation.inserted_id)}), 201

    except Exception as e:
        return jsonify({"error": str(e)}), 500




@app.route("/saveOrdonnance", methods=["POST"])
def save_ordonnance():
    data = request.json
    consultation_id = data.get("consultation_id")
    patient_id = data.get("patient_id")
    medecin_id = data.get("medecin_id")
    ordonnance = data.get("ord")

    if not patient_id or not ordonnance:
        return jsonify({"message": "Données manquantes"}), 400

    try:

        medications = [
            {
                "medicament": ordonnance["medicament"][i],
                "forme": ordonnance["forme"][i],
                "dosage": ordonnance["dosage"][i],
                "posologie": ordonnance["posologie"][i],
                "momment": ordonnance["momment"][i],
                "duree": ordonnance["duree"][i],
                "description": ordonnance["description"][i],
                "subtituable": ordonnance["subtituable"][i],
            }
            for i in range(len(ordonnance["medicament"]))
        ]

        # Create the structured ordonnance object
        ordonnance_data = {
            "hopitalar": ordonnance.get("hopitalar", ""),
            "hopital": ordonnance.get("hopital", ""),
            "wilaya": ordonnance.get("wilaya", ""),
            "docteur": ordonnance.get("docteur", ""),
            "patient": ordonnance.get("patient", ""),
            "age": ordonnance.get("age", ""),
            "dateord": ordonnance.get("dateord", ""),
            "medicaments": medications
        }


        db_consultation.update_one(
            {"_id": ObjectId(consultation_id)},
            {"$push": {"ord": ordonnance_data}}
        )


        traitement_data = {
            "Date_de_Prescription": datetime.now().strftime("%Y-%m-%d %H:%M:%S"),
            "patient_id": patient_id,
            "medecin_id": medecin_id,
            "medicaments": medications,
        }

        db_traitement.insert_one(traitement_data)

        return jsonify({"message": "Ordonnance et traitement ajoutés avec succès"}), 200

    except Exception as e:
        return jsonify({"message": f"Erreur: {str(e)}"}), 500



@app.route("/saveRapport", methods=["POST"])
def save_rapport():
    data = request.json
    consultation_id = data.get("consultation_id")
    patient_id = data.get("patient_id")
    medecin_id = data.get("medecin_id")
    rapport = data.get("rapport")
    print(rapport,consultation_id)
    if not consultation_id or not rapport:
        return jsonify({"message": "Données manquantes"}), 400

    try:

        db_consultation.update_one(
            {"_id": ObjectId(consultation_id)},
            {"$setOnInsert": {"rapport": []}}
        )

        updated_consultation = db_consultation.update_one(
            {"_id": ObjectId(consultation_id)},
            {"$push": {"rapport": rapport}}
        )

        if updated_consultation.matched_count == 0:
            return jsonify({"message": "Consultation non trouvée"}), 404

        return jsonify({"message": "Rapport ajouté avec succès"}), 200

    except Exception as e:
        return jsonify({"message": f"Erreur: {str(e)}"}), 500




@app.route("/getMedicaments/<patient_id>", methods=["GET"])
def get_medicaments(patient_id):
    traitements = list(db_traitement.find({"patient_id": patient_id}))

    result = []
    for traitement in traitements:
        medecin_id = traitement.get("medecin_id")
        medecin_nom = "Médecin inconnu"

        if medecin_id:
            medecin = db_info_medcine.find_one({"_id": ObjectId(medecin_id)})
            if medecin:
                medecin_nom = medecin.get("nom", "Médecin inconnu")

        for medicament in traitement.get("medicaments", []):
            result.append({
                "Date_de_Prescription": traitement["Date_de_Prescription"],
                "Medecin": medecin_nom,
                "Medicament": medicament["medicament"],
                "Dosage": medicament["dosage"],
                "Posologie": medicament["posologie"],
                "Momment": medicament["momment"],
                "Duree": medicament["duree"],
                "Description": medicament["description"],
                "Substituable": medicament["subtituable"],
            })

    return jsonify(result), 200


@app.route("/medecin/patients", methods=["GET"])
def get_patients():
    medecin_id = request.args.get("medecin_id")
    if not medecin_id:
        return jsonify({"error": "Medecin ID is required"}), 400
    
    medecin = db_info_medcine.find_one({"_id": ObjectId(medecin_id)})
    if not medecin:
        return jsonify({"error": "Medecin not found"}), 404

    patient_ids = medecin.get("patients", [])

    try:
        patient_ids = [ObjectId(pid) for pid in patient_ids]
    except Exception:
        return jsonify({"error": "Invalid patient IDs"}), 400

    patients = list(db_info_patients.find({"_id": {"$in": patient_ids}}))  

    for patient in patients:
        patient["_id"] = str(patient["_id"]) 

    return jsonify(patients)


@app.route("/find/medecins/patient/<patient_id>", methods=["GET"])
def find_medecins_by_patient(patient_id):
    consultations_list = list(db_consultation.find({"patient_id": patient_id}))
    
    medecins_data = {}
    for consultation in consultations_list:
        medecin_id = consultation.get("medecin_id")
        ordonnances = consultation.get("ord", [])

        if medecin_id not in medecins_data:

            medecin = db_info_medcine.find_one({"_id": ObjectId(medecin_id)}, {"nom": 1, "prenom": 1})
            if medecin:
                medecins_data[medecin_id] = {
                    "_id": str(medecin_id),
                    "nom": medecin["nom"],
                    "prenom": medecin["prenom"],
                    "ordonnances": []
                }
        
        if ordonnances:
            medecins_data[medecin_id]["ordonnances"].extend(ordonnances)

    return jsonify(list(medecins_data.values()))






if __name__ == '__main__':
    app.run(debug=False)  
