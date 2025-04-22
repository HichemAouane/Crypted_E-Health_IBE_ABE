import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './Med.css';
import Goback from '../Commun/Goback';
import Navbar from '../Commun/Navigation/Navbar';
import ListOfHospitalsInAlgeria from "./ListOfHospitalsInAlgeria.json";

const Med = () => {
    
    const [formData, setFormData] = useState({
        user_id:'',
        nom: '',
        prenom: '',
        sexe: '',
        datedenaissance: '',
        contact: '',
        specialite: '',
        experience:'',
        Hopitalprincipale:'',
        Willayaprincipale:'',
        Communeprincipale:'',
        hopital: [],
        willaya:[],
        commune:[],
        patients:[],
        verified: false,
        photo:'https://static.vecteezy.com/ti/vecteur-libre/p1/14194216-icone-d-avatar-humain-le-badge-d-une-personne-vecteur-symbole-de-profil-de-medias-sociaux-le-symbole-d-une-personne-vectoriel.jpg'
    });

    const infoProRef = useRef(null);

    useEffect(() => {
        if (infoProRef.current) {
            infoProRef.current.scrollTop = infoProRef.current.scrollHeight;
        }
    }, [formData.hopital, formData.willaya, formData.commune]);
    
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        
        if (name === "contact") {

            const phoneNumber = value.replace();
            if (!/^[0-9]{0,10}$/.test(phoneNumber)) return;
        }
    
        setFormData(prevState => ({
            ...prevState,
            [name]: value 
          }));
    };

    const handleChangeExp = (e) => {
        const { name, value } = e.target;
        
        if (name === "experience") {

            const experiencenumber = value.replace();
            if (!/^[0-9]{0,2}$/.test(experiencenumber)) return;
        }
    
        setFormData(prevState => ({
            ...prevState,
            [name]: value 
          }));
    };

    const handleChangeName = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        
        if (name === "prenom" || name === "nom") {
            sanitizedValue = value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ -]/g, '');
        }
        
        setFormData({ ...formData, [name]: sanitizedValue });
    };
      

    const handleVerification = () => {
        setFormData(prevState => ({
            ...prevState,
            verified: true
        }));
        alert("Si vous etes sur donc inscrivez-vous");
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.contact)) {
            alert('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
            return;
        }

        const yearsExp = /^[0-9]{2}$/;
        if (!yearsExp.test(formData.experience)) {
            alert('Veuillez entrer un nombre valide (1 ou 2 chiffres).');
            return;
        }

        const name = /^[a-zA-Z -]*$/;
        if (!name.test(formData.nom)) {
            alert('Veuillez entrer que des lettre - ou espace.');
            return;
        }

        if (!formData.verified) {
            alert("Veuillez vérifier vos informations avant de confirmer.");
            return;
        }
        
        try {
            const response = await fetch("http://127.0.0.1:5000/userinfomed", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
    
            const data = await response.json();

            sessionStorage.setItem("profile_id", data.profile_id);

            
            if (response.ok) {
                alert("Registration Successful!");
                {formData.specialite=== "Radiologue" ?navigate('/princR'):navigate('/princM'); }
                window.location.reload(); 
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server connection failed.");
        }

    };

   

    const handleAddHospitales = () => {
        setFormData(prevState => ({
          ...prevState,
          hopital: [...prevState.hopital, "",],
          commune: [...prevState.commune, "",],
          willaya: [...prevState.willaya, "",]
        }));
      };
      

      const handleHospitalChange = (index, field, value) => {
        setFormData(prevState => {
            const newData = { ...prevState };
            newData[field] = [...prevState[field]];
            newData[field][index] = value; 
            return newData;
        });
    };
    
    const handleDeleteHospitales = (index) => {
        setFormData(prevState => ({
            ...prevState,
            hopital: prevState.hopital.filter((_, i) => i !== index),
            willaya: prevState.willaya.filter((_, i) => i !== index),
            commune: prevState.commune.filter((_, i) => i !== index)
        }));
    };
      
          
    
    
    return (
        <div>
            <Navbar />
            <Goback />         
            <div className="med-container" style={{marginTop:"55px"}}>

                <h1>Formulaire Médecin</h1>
                <br></br>
                <form onSubmit={handleSubmit}>
                    <div className='Info-pers-pro'>
                        <div className='Info-Pers'>
                            <h2>Informations Personnelle</h2>
                            <div style={{display:"flex"}}>
                                <div>
                                    <p style={{width:"110px",fontWeight:"600"}}>Nom</p>
                                    <input
                                    type="name"
                                    name="nom"
                                    placeholder="NOM"
                                    value={formData.nom}
                                    onChange={handleChangeName}
                                    required
                                    style={{ textTransform:"uppercase"}}
                                />
                                </div>
                                
                                <div>
                                    <p style={{width:"130px",fontWeight:"600"}}>Prénom</p>
                                    <input
                                        type="text"
                                        name="prenom"
                                        placeholder="Prenom"
                                        value={formData.prenom}
                                        onChange={handleChangeName}
                                        required
                                    />
                                </div>
                                
                            </div>
                            
                            <div style={{display:"flex"}}>
                                <div>
                                    <p style={{width:"110px",fontWeight:"600"}}>Sexe</p>
                                    <select
                                    name="sexe"
                                    value={formData.sexe}
                                    onChange={handleChange}
                                    required
                                    >
                                        <option value="">Choisissez Votre Sexe</option>

                                        <option value="Masculin">
                                            Masculin
                                        </option>

                                        <option value="Féminin">
                                            Féminin
                                        </option>

                                    </select>
                                </div>
                                <div>
                                    <p style={{width:"202px",fontWeight:"600"}}>Date de naissance</p>
                                    <input
                                    type="date"
                                    name="datedenaissance"
                                    placeholder="Date de naissance"
                                    value={formData.datedenaissance}
                                    onChange={handleChange}
                                    required
                                    />
                                </div>
                            </div>
                            

                            
                            <div style={{ display: "flex",gap:"50px", alignItems: "center" }}>
                                <div>
                                    <p style={{width:"137px",fontWeight:"600"}}>Num-Tel</p>  
                                    <input
                                    value={" +213"}
                                    style={{width:"69px",marginRight:"10px"}}
                                    />

                                    <input
                                        type="tel"
                                        name="contact"
                                        placeholder="Numéro de téléphone"
                                        value={formData.contact}
                                        onChange={handleChange}
                                        style={{width:"300px"}}
                                        required
                                    /> 
                                </div>
                                
                            </div>
                            
                            
                        </div>
                        <br></br>    
                                       
                        <div ref={infoProRef} id="infoPro" className='Info-Pro' style={{paddingRight:"150px", maxHeight: "400px", overflowY: "auto",overflowX: "hidden" }}>

                            <h2>Informations Professionnels</h2>
                            <div>
                                <div style={{display:"flex",marginLeft:"30px" }}>
                                    <div>
                                        <p style={{width:"140px",fontWeight:"600"}}>specialite</p>
                                        <select
                                            name="specialite"
                                            value={formData.specialite}
                                            onChange={handleChange}
                                            required
                                            
                                        >

                                            <option value="">Choisissez une spécialité</option>

                                            <option value="Cardiologie">Cardiologie</option>

                                            <option value="Diabetologie">Diabetologie</option>

                                            <option value="Radiologue">Radiologue</option>

                                            <option value="Endocrino-diabetologie">Endocrino-diabetologie</option>

                                        </select>
                                    </div>
                                    
                                    <div>
                                        <p style={{width:"150px",fontWeight:"600"}}>Experience</p>
                                        <input
                                        type="text"
                                        name="experience"
                                        placeholder="Années d'experience"
                                        value={formData.experience}
                                        onChange={handleChangeExp}
                                        required                           
                                        />
                                    </div>
                                </div>                             
                            </div>
                            
                            <div style={{ display: "flex",gap:"20px", alignItems: "center",   marginLeft:"7px" }}>
                                <div>
                                    <p style={{width:"80px",fontWeight:"600"}}>Hopital/Clinique</p>
                                    <select
                                    name="Hopitalprincipale"
                                    value={formData.Hopitalprincipale} 
                                    onChange={handleChange}
                                    required
                                
                                >

                                        <option value="">Hopital / Clinique </option>

                                        <option value="Hopital El Ketar">Hopital El Ketar</option>

                                        <option value="Polyclinique de Ben Omar">Polyclinique de Ben Omar</option>
                                        {Array.from({ length: 48 }, (_, i) => i + 1).map((num) => 
                                            ListOfHospitalsInAlgeria[num]?.hospital?.map((hop, index) => (
                                                <option key={`${num}-${index}`} value={hop}>{hop}</option>
                                            ))
                                        )}

                                    </select>
                                </div>
                                
                                <div>
                                    <p style={{width:"50px",fontWeight:"600"}}>Willaya</p>
                                    {/* Sélecteur Willaya */}
                                    <select
                                    name="Willayaprincipale"
                                    value={formData.Willayaprincipale}
                                    onChange={handleChange}
                                    required
                                    
                                    >
                                        <option value="">Willaya</option>
                                
                                        <option value="Alger">Alger</option>

                                        <option value="Adrar">Adrar</option>

                                    </select>
                                </div>
                                
                                <div>
                                    <p style={{width:"50px",fontWeight:"600"}}>Commune</p>
                                    {/* Sélecteur Commune */}
                                    <select
                                        name="Communeprincipale"
                                        value={formData.Communeprincipale}
                                        onChange={handleChange}
                                        required
                                    >
                                        <option value="">Commune</option>
                                                    
                                        <option value="Lareb3a nath irathen">Lareb3a nath irathen</option>
                            
                                    </select>
                                </div>
                                

                                <buttonbtn type="button" style={{width:"1px", marginRight:"7px", marginLeft:"-8px",marginBottom:"10px",cursor:"pointer"}} onClick={handleAddHospitales} >➕</buttonbtn>
                            </div>

                                                       {/* Affichage de la carte Google Maps */}
                    {formData.Hopitalprincipale && (
                        <div style={{ marginLeft: '40px' }}>
                            <h4>Localisation de l'Hôpital</h4>
                            <iframe
                                height="100"
                                style={{ marginLeft:"10px" }}
                                src={`https://www.google.com/maps?q=${encodeURIComponent(formData.Hopitalprincipale)}&output=embed`}
                                allowFullScreen
                            ></iframe>
                        </div>
                    )}
                
                            {formData.hopital.map((hospital, index) => (

                            <div  key={index} style={{ display: "flex",flexDirection:"column" }}>
                                {/* Sélecteur Hôpital */}
                                <div style={{ display: "flex",gap:"20px", alignItems: "center",  marginBottom: "5px", marginLeft:"7px" }}>
                                <div>
                                    <p style={{width:"80px",fontWeight:"600"}}>Hopital/Clinique</p>
                                    <select
                                    value={hospital}
                                    onChange={(e) => handleHospitalChange(index, 'hopital', e.target.value)}
                                    required
                                   
                                    >
                                        <option value="">Hopital / Clinique</option>

                                        <option value="Hopital El Ketar">Hopital El Ketar</option>

                                        <option value="Clinique Ben Omar">Clinique Ben Omar</option>

                                        <option value="Hopital Mustapha Pacha">Hopital Mustapha Pacha</option>

                                    </select>
                                </div>
                                
                                

                                <div>
                                    <p style={{width:"50px",fontWeight:"600"}}>Willaya</p>
                                    {/* Sélecteur Willaya */}
                                    <select
                                        value={formData.willaya[index] || ''}
                                        onChange={(e) => handleHospitalChange(index, 'willaya', e.target.value)}
                                        required
                                        
                                    >
                                        <option value="">Willaya</option>
                                        
                                        <option value="Alger">Alger</option>

                                        <option value="Adrar">Adrar</option>

                                    </select>
                                </div>
                                
                                

                                <div>
                                    <p style={{width:"50px",fontWeight:"600"}}>Commune</p>
                                    {/* Sélecteur Commune */}
                                    <select
                                        value={formData.commune[index] || ''}
                                        onChange={(e) => handleHospitalChange(index, 'commune', e.target.value)}
                                        required
                                        
                                    >
                                        <option value="">Commune</option>
                                                    
                                        <option value="Lareb3a nath irathen">Lareb3a nath irathen</option>
                            
                                    </select>
                                </div>
                                
                                 <buttonbtn type="buttonbtn"  onClick={() => handleDeleteHospitales(index)}
                                style={{width:"1px", marginRight:"7px",marginBottom:"10px", marginLeft:"-8px",cursor:"pointer",}}>
                                    🗑️</buttonbtn>
                                </div> 
                                                                                                {/* Affichage des cartes Google Maps pour chaque hôpital ajouté */}
                            {formData.hopital.map((hospital, index) => (
                                hospital ? (
                                    <div key={index} style={{ marginTop: '20px', border: "1px solid #ccc", padding: "10px", borderRadius: "5px" }}>
                                        <h3>Localisation de {hospital}</h3>
                                        <iframe
                                            height="100"
                                            frameBorder="0"
                                            style={{ border: 0, marginBottom: "10px" }}
                                            src={`https://www.google.com/maps?q=${encodeURIComponent(hospital)}&output=embed`}
                                            allowFullScreen
                                        ></iframe>
                                    </div>
                                ) : null // Empêche l'affichage si aucun hôpital n'est sélectionné
))}   
                            </div>

                                
                            
                            ))}

                        </div>

                    </div>
                    <div>
                        <button type="button" onClick={handleVerification}>Vérifier</button>
                        <button onClick={()=>{setFormData(prevState => (
                            {...prevState,["user_id"]: sessionStorage.getItem("user_id")}))}} disabled={!formData.verified}>S'inscrire</button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default Med;