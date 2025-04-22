import React, { useState } from "react";


const OnerdvS = ({ rdv }) => {

    const [isInfoPopupOpen, setIsInfoPopupOpen] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const [hoverPosition, setHoverPosition] = useState({ top: 0, left: 0 });

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


    return (
        <>
            <tr>
                <td>
                    <img
                        src={rdv.medecin.photo || "https://static.vecteezy.com/ti/vecteur-libre/p1/14194216-icone-d-avatar-humain-le-badge-d-une-personne-vecteur-symbole-de-profil-de-medias-sociaux-le-symbole-d-une-personne-vectoriel.jpg"}
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
                            <div style={{marginBottom:"5px"}} key={index}>{date}</div>
                        ))
                    ) : (
                        rdv.daterdv || "N/A"
                    )}
                </td>              
                <td>{rdv.TypeDeRdv || "N/A"}</td>
                <td>{rdv.TypeDeConsultation || "N/A"}</td>
                <td>{rdv.Motif || "N/A"}</td>
                <td>{rdv.statut || "N/A"}</td>
            </tr>

            {isInfoPopupOpen && (
                <div className="popup-overlay">
                    <div style={{width:"50%", height:"80%", textAlign:"center"}} className="popup-content">
                        <button className="popup-close" onClick={() => setIsInfoPopupOpen(false)}>X</button>
                        <h2 style={{margin:"20px 0px"}}>Informations du Medecin</h2>
                        <img
                            src={rdv.medecin.photo || "https://static.vecteezy.com/ti/vecteur-libre/p1/14194216-icone-d-avatar-humain-le-badge-d-une-personne-vecteur-symbole-de-profil-de-medias-sociaux-le-symbole-d-une-personne-vectoriel.jpg"}
                            alt="Profile"
                            className="profile-pic"
                            style={{ width: "100px", height: "100px", borderRadius: "50%", cursor: "pointer" }}
                        />
                        <p style={{margin: "15px 0px"}}><strong>Nom :</strong> {rdv.medecin.nom || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Prénom :</strong> {rdv.medecin.prenom || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Âge:</strong> {calculateAge(rdv.medecin.datedenaissance) || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Contact:</strong> {rdv.medecin.contact || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Sexe:</strong> {rdv.medecin.sexe || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Specialty:</strong> {rdv.medecin.specialite || "N/A"}</p>
                        <p style={{margin: "15px 0px"}}><strong>Experience:</strong> {rdv.medecin.experience+" Ans" || "N/A"}</p>
                        
                        
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
                        <li><strong>Nom et Prenom:</strong> {rdv.medecin.nom +" "+rdv.medecin.prenom || "N/A"}</li>
                        <li><strong>Âge:</strong> {calculateAge(rdv.medecin.datedenaissance) || "N/A"}</li>
                        <li><strong>Contact:</strong> {rdv.medecin.contact || "N/A"}</li>
                        <li><strong>Sexe:</strong> {rdv.medecin.sexe || "N/A"}</li>
                        <li><strong>Specialty:</strong> {rdv.medecin.specialite || "N/A"}</li>
                        <li><strong>Experience:</strong> {rdv.medecin.experience || "N/A"}</li>

                    </ul>
                </div>
            )}
        </>
    );
};

export default OnerdvS;
