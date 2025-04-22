import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Patient.css';
import Goback from '../Commun/Goback';
import Navbar from '../Commun/Navigation/Navbar';




const Patient = () => {
    const [formData, setFormData] = useState({
        user_id:'',
        nom: '',
        prenom: '',
        sexe: '',
        datedenaissance: '',
        contact: '',
        contacturgence: "",
        diabetesType: '',
        otherDiseases: '',
        poids:{
            valeur:'',
            unitpoids:'Kg'},
        taille:{
            valeur:'',
            unittaille:'cm'},
        medecins:[],
        verified: true,
        photo:'https://static.vecteezy.com/ti/vecteur-libre/p1/14194216-icone-d-avatar-humain-le-badge-d-une-personne-vecteur-symbole-de-profil-de-medias-sociaux-le-symbole-d-une-personne-vectoriel.jpg'
    });


    
    const navigate = useNavigate();
    
     

    const handleChange = (e) => {
        const { name, value } = e.target;
        if (name === "contact") {
            // S'assurer que seuls 9 à 10 chiffres 
            const phoneNumber = value.replace();
            if (!/^[0-9]{0,10}$/.test(phoneNumber)) return;
        }

        if (name === "contacturgence") {
            // S'assurer que seuls 9 à 10 chiffres 
            const phoneNumber = value.replace();
            if (!/^[0-9]{0,10}$/.test(phoneNumber)) return;
        }
        
        if (name.startsWith("poids") || name.startsWith("taille")) {
            const [field, subField] = name.split(".");
            let formattedValue = value;
                
            if (subField === "valeur") {
                if (field === "taille") {
                    if (formData.taille.unittaille === "cm") {
                        formattedValue = value.replace(/[^0-9.]/g, "").slice(0, 6); // XXX.XX
                        if (!/^\d{0,3}(\.\d{0,2})?$/.test(formattedValue)) return;
                    } else if (formData.taille.unittaille === "Ft") {
                        formattedValue = value.replace(/[^0-9.]/g, "").slice(0,4); // X.XX
                        if (!/^\d{0,1}(\.\d{0,2})?$/.test(formattedValue)) return;
                    }
                } else if (field === "poids") {
                    if (formData.poids.unitpoids === "Kg") {
                        formattedValue = value.replace(/[^0-9.]/g, "").slice(0, 7); // XXX.XXX
                        if (!/^\d{0,3}(\.\d{0,3})?$/.test(formattedValue)) return;
                    } else if (formData.poids.unitpoids === "Lbs") {
                        formattedValue = value.replace(/[^0-9]/g, "").slice(0, 3); // XXX (integer only)
                        if (!/^\d{0,3}$/.test(formattedValue)) return;
                    }
                }
            }
    
            setFormData(prevState => ({
                ...prevState,
                [field]: {
                    ...prevState[field],
                    [subField]: formattedValue,
                },
            }));
        } else {
            setFormData(prevState => ({
                ...prevState,
                [name]: value
            }));
        }
    };
    

    

    const handleChangeName = (e) => {
        const { name, value } = e.target;
        let sanitizedValue = value;
        
        if (name === "prenom" || name === "nom") {
            sanitizedValue = value.replace(/[^a-zA-ZÀ-ÖØ-öø-ÿ -]/g, '');
        }
        
        setFormData({ ...formData, [name]: sanitizedValue });
    };
    

    const handleSubmit = async (e) => {
        e.preventDefault();

        const phoneRegex = /^[0-9]{10}$/;
        if (!phoneRegex.test(formData.contact)) {
            alert('Veuillez entrer un numéro de téléphone valide (10 chiffres).');
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
            const response = await fetch("http://127.0.0.1:5000/userinfopat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            })
            ;
    
            const data = await response.json();

            sessionStorage.setItem("profile_id", data.profile_id);
            
            if (response.ok) {
                alert("Registration Successful!");
                navigate('/princp');
                window.location.reload();  
            } else {
                alert("Error: " + data.error);
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Server connection failed.");
        }
    };

    return (
        
    <div>
        <Navbar />
        <Goback />
        <div className="patient-container" style={{marginTop:"55px"}}>
            <h1>Formulaire Patient</h1>
            <br></br>
            <form onSubmit={handleSubmit}>
                <div className='Info-pers-pro'>
                    <div className='Info-Pers'>
                        <h2 style={{marginBottom:"10px"}}>Informations Personnelle</h2>
                        <div style={{display:"flex"}}>
                            <div>
                                <p style={{width:"110px",fontWeight:"600"}}>Nom</p>
                                <input
                                type="text"
                                name="nom"
                                placeholder="NOM"
                                value={formData.nom}
                                onChange={handleChangeName}
                                required
                                style={{textTransform:"uppercase"}}
                                />
                            </div>
                            <div>
                                <p style={{width:"132px",fontWeight:"600"}}>Prénom</p>
                                <input
                                    type="text"
                                    name="prenom"
                                    placeholder="Prénom"
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
                                    <option value="Masculin">Masculin</option>
                                    <option value="Féminin">Féminin</option>

                                </select>
                            </div>
                            <div>
                                <p style={{width:"205px",fontWeight:"600"}}>Date de naissance</p>
                                <input
                                    type="date"
                                    name="datedenaissance"
                                    placeholder="date de naissance"
                                    value={formData.datedenaissance}
                                    onChange={handleChange}
                                    required
                                />
                            </div>           
                        </div>
                        <div style={{display:"flex"}}>
                            
                            <div >
                                <p style={{width:"138px",fontWeight:"600"}}>Num-Tel</p>   
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

                        <div style={{display:"flex"}}>
                            
                            <div >
                                <p style={{width:"205px",fontWeight:"600"}}>Num-Tel-Urgence</p>   
                                <input
                                    value={" +213"}
                                    style={{width:"69px",marginRight:"10px"}}
                                />
                                <input
                                    type="tel"
                                    name="contacturgence"
                                    placeholder="Numéro de téléphone d'urgence"
                                    value={formData.contacturgence}
                                    onChange={handleChange}
                                    style={{width:"300px"}}
                                /> 
                            </div>                                                                            
                        
                        </div> 
                                                            
                    </div>
                    <br></br>
                    <div className='Info-Pro'>
                        <h2 style={{marginBottom:"10px"}}>Informations Medicale</h2>
                        <div style={{ display: "flex",gap:"20px", alignItems: "center" }}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <p style={{width:"95px",fontWeight:"600",height:"19px"}}>Taille</p>
                                <div style={{display:"flex",columnGap:"50px",marginLeft:"30px"}}>
                                    <input
                                        type='text'
                                        name='taille.valeur'
                                        placeholder="La taille"
                                        value={formData.taille.valeur}
                                        onChange={handleChange}                                      
                                    />                                   
                                    <select                     
                                        name='taille.unittaille'
                                        value={formData.taille.unittaille}
                                        onChange={handleChange}
                                        style={{width:"100px"}}
                                    >
                                        <option value="cm">cm</option>
                                        <option value="Ft">Ft</option>

                                    </select>
                                </div>
                            </div>                                  
                        </div>

                        <div style={{ display: "flex",gap:"20px" ,alignItems:"center" }}>
                            <div style={{display:"flex",flexDirection:"column"}}>
                                <p style={{width:"100px",fontWeight:"600",height:"19px"}}>Poids</p>
                                <div style={{display:"flex",columnGap:"50px",marginLeft:"30px"}}>
                                    <input
                                        type='text'
                                        name='poids.valeur'
                                        placeholder="Poids"
                                        value={formData.poids.valeur}
                                        onChange={handleChange}                                 
                                    />                                  
                                    <select                     
                                    name='poids.unitpoids'
                                    value={formData.poids.unitpoids}
                                    onChange={handleChange}
                                    style={{width:"100px",}}

                                    >
                                        <option value="Kg">Kg</option>
                                        <option value="Lbs">Lbs</option>

                                    </select>
                                                               
                                </div>
                            </div>                            
                        </div>


                        
                            
                        <div style={{display:"flex",columnGap:"32px"}}>
                            <div style={{width:"120px",paddingLeft:"30px"}}>
                                <p style={{width:"118px",fontWeight:"600"}}>Type de Diabete</p>
                                <select
                                    name="diabetesType"
                                    value={formData.diabetesType}
                                    onChange={handleChange}
                                    required
                                >
                                    <option value="">Votre Type de Diabete</option>
                                    <option value="Type 1">Type 1</option>
                                    <option value="Type 2">Type 2</option>
                                </select>
                            </div>
                            <div>
                                <p style={{width:"265px",fontWeight:"600"}}>Autres maladies</p>
                                <input
                                    type="text"
                                    name="otherDiseases"
                                    placeholder="Autres maladies"
                                    value={formData.otherDiseases}
                                    onChange={handleChange}
                                />
                            </div>                  
                        </div>
                                
                    </div>
                </div>
                            
                <button onClick={()=>{setFormData(prevState => (
                    {...prevState,["user_id"]: sessionStorage.getItem("user_id")}))}} >S'inscrire</button>
            </form>
        </div>
    </div>
    );
};

export default Patient;