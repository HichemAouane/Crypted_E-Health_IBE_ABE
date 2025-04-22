import React, { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { FaChevronDown } from "react-icons/fa";
import "./SidebarLanding.css";

const SidebarLanding = ({ isOpen }) => {
    const navigate = useNavigate();
    const [isDocOpen, setIsDocOpen] = useState(false);

    const typeacc = localStorage.getItem("typedecompte");
    const [typeAcc, setTypeAcc] = useState(sessionStorage.getItem("typedecompte"));

    // Vérifier si un utilisateur est connecté et si le type de compte est Patient ou Medecin
    const isPatientOrMedecinLoggedIn = typeAcc === "Patient" || typeAcc === "Medecin";

    const handleProfileNavigation = (profil) => {
        if (profil === "Medecin") {
            navigate("/princm");
        } else if (profil === "Patient") {
            navigate("/princp");
        }
    }

    const handleCardSelection = (select) => {
        if (select === 'Home') {
            handleProfileNavigation(typeAcc);
        } else if (select === 'Diabete') {
            navigate('/diabete');
        } else if (select === 'Cardio') {
            navigate('/cardio');
        } else if (select === 'Partner') {
            navigate('/partner');
        }
    };

    const toggleDoc = () => {
        setIsDocOpen(!isDocOpen);
    };

    return (
        <aside className={`sidebarl ${isOpen ? "open" : "closed"} ${typeAcc === "Patient" ? "patient" : typeAcc === "Medecin" ? "medecin" : "default"}`}>
            <ul>
              {/* Afficher Home seulement si l'utilisateur est connecté en tant que Patient ou Medecin */}
              {isPatientOrMedecinLoggedIn && (
                    <div style={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={() => handleCardSelection("Home")}>
                        <SidebarItem
                            className="sidebarl-item"
                            icon={<img src="https://cdn-icons-png.flaticon.com/512/5393/5393061.png " alt="Home Icon" style={{ width: "35px", height: "35px", marginRight: "35px" }} />}
                            text="Page Principale"
                        />
                    </div>
                )}
                
            
                <div style={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={() => handleCardSelection("AboutsUs")}>
                    <SidebarItem
                        className="sidebarl-item"
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/0/472.png" alt="AboutsUs Icon" style={{ width: "35px", height: "35px", marginRight: "35px" }} />}
                        text="Qui Sommes Nous ?"
                    />
                </div>
            

                {/* Élément parent Information avec flèche */}
                <div onClick={toggleDoc} className="sidebarl-parent-item">
                    <SidebarItem
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2356/2356572.png " alt="Documentation Icon" style={{ width: "35px", height: "35px", marginRight: "30px" }} />}
                        text="Documentations"
                        extraIcon={<FaChevronDown className={`arrow ${isDocOpen ? "open" : ""}`} />}
                    />
                </div>

                {/* Sous-menu Information */}
                {isDocOpen && (
                    <ul  className={`submenul  ${typeAcc === "Patient" ? "subpatient" : typeAcc === "Medecin" ? "submedecin" : "subdefault"}`}>
                        <li onClick={() => handleCardSelection("Cardio")}>
                            <SidebarItem
                                icon={<img src="https://cdn-icons-png.flaticon.com/512/3999/3999754.png " alt="Rendez-Vous Actuel Icon" style={{ width: "30px", height: "30px", marginRight: "30px" }} />}
                                text="Probleme Cardiovasculaire"
                            />
                        </li>
                        <li onClick={() => handleCardSelection("Diabete")}>
                            <SidebarItem
                                icon={<img src="https://cdn-icons-png.flaticon.com/512/8420/8420741.png " alt="Rendez-Vous Demande Icon" style={{ width: "30px", height: "30px", marginRight: "30px" }} />}
                                text="Diabete"
                            />
                        </li>
                    </ul>
                )}

                {/* Élément Partenaire */}
                <div onClick={() => handleCardSelection("Partner")}>
                    <SidebarItem
                        className="sidebarl-item"
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/2887/2887358.png " alt="Partner Icon" style={{ width: "35px", height: "35px", marginRight: "35px" }} />}
                        text="Nos Partenaire"
                    />
                </div>
            </ul>
        </aside>
    );
};

const SidebarItem = ({ icon, text, extraIcon }) => {
  return (
    <li className="sidebar-item">
      {icon}
      <span className="text">{text}</span>
      {extraIcon && <span className="extra-icon">{extraIcon}</span>}
    </li>
  );
};

export default SidebarLanding;