import React, { useState } from "react";
import ConfirmRdv from "./ConfirmRdv";
import "./RdvM.css";
import "./selectandhighlightdate.css"

const OneRdv = ({ rdv }) => {
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [selectedDate, setSelectedDate] = useState(null);
    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

    const handleDateClick = (date) => {
        setSelectedDate(date === selectedDate ? null : date);
    };

    const handleMouseEnter = (event) => {
        const rect = event.target.getBoundingClientRect();
        setHoverPosition({
            top: rect.top + window.scrollY + 57, 
            left: rect.left + window.scrollX + 57,
        });
        setIsHovered(true);
    };

    const calculateAge = (birthDate) => {
        if (!birthDate) return "N/A"; 
    
        const birth = new Date(birthDate);
        const today = new Date();
    
        let age = today.getFullYear() - birth.getFullYear();
        const monthDiff = today.getMonth() - birth.getMonth();
        const dayDiff = today.getDate() - birth.getDate();

        if (monthDiff < 0 || (monthDiff === 0 && dayDiff < 0)) {
            age--;   
        }
        if(age === 0 ){
            if(monthDiff === 0){
                return dayDiff+" Jours"
            }
            return monthDiff+" Mois"
        }
        return age+" Ans"
    };

    const refuseRdv = async () => {
        try {
            await fetch(`http://localhost:5000/randez-vous-recep/${rdv._id?.$oid}/refuse`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ statut: "refusé" }),
            });
            alert("Rendez-vous refusé !");
        } catch (error) {
            console.error("Erreur lors du refus du rendez-vous :", error);
        }
    };

    return (
        <>
            <tr>
                <td>
                    <img
                        src={rdv.patient.photo|| "https://static.vecteezy.com/ti/vecteur-libre/p1/14194216-icone-d-avatar-humain-le-badge-d-une-personne-vecteur-symbole-de-profil-de-medias-sociaux-le-symbole-d-une-personne-vectoriel.jpg"}
                        alt="Profile"
                        className="profile-pic"
                        onMouseEnter={handleMouseEnter}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={() => setIsInfoPopupOpen(true)}
                    />
                </td>
               
                <td>
                    {Array.isArray(rdv.daterdv) ? (
                        rdv.daterdv.map((date, index) => (
                            <div
                                key={index}
                                className={`date-item ${selectedDate === date ? "selecteda" : ""}`}
                                onClick={() => handleDateClick(date)}
                            >
                                {date}
                            </div>
                        ))
                    ) : (
                        <div>{rdv.daterdv || "N/A"}</div>
                    )}
                </td>
                <td>{rdv.TypeDeRdv || "N/A"}</td>
                <td>{rdv.TypeDeConsultation || "N/A"}</td>
                <td>{rdv.Motif || "N/A"}</td>
                <td>
                    <button className="Accept" onClick={() => setIsPopupOpen(true)}>✔️</button>
                    <button className="Decline" onClick={refuseRdv}>❌</button>
                </td>
            </tr>
            
            {isInfoPopupOpen && (
                <div className="popup-overlay">
                    <div style={{width:"50%", height:"80%", textAlign:"center"}} className="popup-content">
                        <button className="popup-close" onClick={() => setIsInfoPopupOpen(false)}>X</button>
                        <h2 style={{margin:"20px 0px"}}>Informations du Patient</h2>
                        <img
                            src={rdv.patient.photo || "https://static.vecteezy.com/ti/vecteur-libre/p1/14194216-icone-d-avatar-humain-le-badge-d-une-personne-vecteur-symbole-de-profil-de-medias-sociaux-le-symbole-d-une-personne-vectoriel.jpg"}
                            alt="Profile"
                            className="profile-pic"
                            style={{ width: "100px", height: "100px", borderRadius: "50%", cursor: "pointer" }}
                        />
                        <p style={{margin: "15px 0px"}}><strong>Nom :</strong> {rdv.patient.nom} {rdv.patient.prenom || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Prénom :</strong> {rdv.patient.prenom || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Âge:</strong> {calculateAge(rdv.patient.datedenaissance) || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Contact:</strong> {rdv.patient.contact || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Sexe:</strong> {rdv.patient.sexe || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Type De Diabète:</strong> {rdv.patient.diabetesType || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Poid:</strong> {rdv.patient.poids.valeur+" "+rdv.patient.poids.unitpoids || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Taille:</strong> {rdv.patient.taille.valeur+" "+rdv.patient.taille.unittaille || "N/A"}</p>
                    </div>
                </div>
            )}


            {isHovered && (
                <div
                    className="hover-list"
                    style={{
                        position: "absolute",
                        top: `${hoverPosition.top}px`,
                        left: `${hoverPosition.left}px`,
                        backgroundColor: "#0099B2",
                        border: "1px solid #0099B2",
                        padding: "10px",
                        color:"white",
                        borderRadius: "8px",
                        boxShadow: "0px 4px 8px rgba(0, 0, 0, 0.2)",
                        zIndex: 1000,
                        minWidth: "150px",
                        width:"35%"
                    }}
                >
                    <ul style={{ margin: 0, padding: 0, listStyle: "none" }}>
                        <li><strong>Nom et Prenom:</strong> {rdv.patient.nom+" "+rdv.patient.prenom || "N/A"}</li>
                        <li><strong>Âge:</strong> {calculateAge(rdv.patient.datedenaissance) || "N/A"}</li>
                        <li><strong>Contact:</strong> {rdv.patient.contact || "N/A"}</li>
                        <li><strong>Sexe:</strong> {rdv.patient.sexe || "N/A"}</li>
                        <li><strong>Type De Diabetes:</strong> {rdv.patient.diabetesType || "N/A"}</li>
                    </ul>
                </div>
            )}

            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="popup-close" onClick={() => setIsPopupOpen(false)}>X</button>
                        <ConfirmRdv rdv={rdv} selectedDate={selectedDate}/>
                    </div>
                </div>
            )}
        </>
    );
};




export default OneRdv;
