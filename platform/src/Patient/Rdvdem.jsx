import React, { memo, useState ,useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP';
import Sidebar from "../Commun/Navigation/Sidebar";

const Rdvdem = memo(() => {

    const location = useLocation();
    const queryParams = new URLSearchParams(location.search);
    const medecin_id = queryParams.get("medecin_id");
    const nom = queryParams.get("nom");
    const prenom = queryParams.get("prenom");
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    const [formData, setFormData] = useState({
        patient_id: sessionStorage.getItem("profile_id"),
        medecin_id: medecin_id ,
        daterdv: [''], 
        statut: 'En Attente',
        Motif: '',
        demande_par_patient: true,
        TypeDeRdv: '',
        TypeDeConsultation: '',
    });
    
    useEffect(() => {
        if (medecin_id) {
            setFormData((prevData) => ({
                ...prevData,
                medecin_id: medecin_id
            }));
        }
    }, [medecin_id]);

    const handleDateChange = (index, value) => {
        const newDates = [...formData.daterdv];
        newDates[index] = value;
        setFormData(prevState => ({
            ...prevState,
            daterdv: newDates
        }));
    };


    const addDateField = () => {
        setFormData(prevState => ({
            ...prevState,
            daterdv: [...prevState.daterdv, ''] 
        }));
    };

  
    const removeDateField = (index) => {
        if (formData.daterdv.length > 1) {
            const newDates = formData.daterdv.filter((_, i) => i !== index);
            setFormData(prevState => ({
                ...prevState,
                daterdv: newDates
            }));
        }
    };


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prevState => ({
            ...prevState,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/randez-vous", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(formData),
            });

            if (response.ok) {
                alert("Demande de rendez-vous envoyée avec succès !");
            } else {
                alert("Erreur lors de l'envoi de la demande.");
            }
        } catch (error) {
            console.error("Erreur:", error);
            alert("Erreur de connexion au serveur.");
        }
    };

    

    return (
        <div>
            <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
               
                <form className='acc-profile-container' onSubmit={handleSubmit}>
                <h2>Remplissez vos informations</h2>
                <input type="hidden" name="medecin_id" value={formData.medecin_id} />
                
                <p style={{margin:"20px 0px",fontSize:"22px",fontWeight:"bold"}}>Médecin : Dr. {nom} {prenom}</p> 
                {formData.daterdv.map((date, index) => (
                    <div key={index} style={{ display: "flex", alignItems: "center", gap: "10px", marginBottom: "5px" }}>
                        <input
                            name={`daterdv-${index}`}
                            type='date'
                            value={date}
                            onChange={(e) => handleDateChange(index, e.target.value)}
                            required
                           
                        />
                        {formData.daterdv.length > 1 && (
                            <buttonbtn type="button" onClick={() => removeDateField(index)} style={{ cursor: "pointer",width:"30px"}}>❌</buttonbtn>
                        )}
                    </div>
                ))}
                <button type="button" onClick={addDateField} style={{ marginBottom: "10px",width:"200px" }}>+ Ajouter une date</button>

                <select
                    name="TypeDeRdv"
                    value={formData.TypeDeRdv}
                    onChange={handleChange}
                    required
                >
                    <option value="">Type De Rendez-Vous</option>
                    <option value="Prémiere Consultation">Prémiere Consultation</option>
                    <option value="Suivie">Suivie</option>
                </select>

                <select
                    name="TypeDeConsultation"
                    value={formData.TypeDeConsultation}
                    onChange={handleChange}
                    required
                >
                    <option value="">Type De Consultation</option>
                    <option value="Consultation en ligne (Vidéo)">Consultation en ligne (Vidéo)</option>
                    <option value="Consultation Presentielle">Consultation Présentielle</option>
                </select>

                <div style={{ display: "flex" }}>
                    <textarea
                        style={{
                            marginLeft: "-10px",
                            maxWidth: "620px",
                            minWidth: "620px",
                            maxHeight: "100px",
                            minHeight: "100px",
                            height: "100px",
                            whiteSpace: "normal",
                            overflowWrap: "break-word",
                            fontSize:"15px",
                            fontFamily:'arial',
                            paddingLeft:"5px"
                        }}
                        placeholder="Motif"
                        name="Motif"
                        value={formData.Motif}
                        onChange={handleChange}
                        required
                    ></textarea>
                </div>

                <button type='submit'>Soumettre</button>
            </form>
            </main>
            
            
        </div>
    );
});

export default Rdvdem;
