import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCompass, FaFilm, FaHistory, FaPlayCircle, FaList, FaChevronDown } from "react-icons/fa";
import "./Sidebar.css";

const Side = ({ isOpen }) => {

   const [isRdvPOpen, setIsRdvPOpen] = useState(false);
   const [isConsultOpen, setIsConsultOpen] = useState(false);
   const [isprescOpen, setIsprescOpen] = useState(false);
    const navigate = useNavigate();

    // Fonction pour rediriger vers ce qu'on choisis
    const handleCardSelection = (select) => {
      if (select === 'ChatP') {
          navigate('/chatp');
      } else if (select === 'Ordrecep') {
          navigate('/listMedecinOrd');
      } else if (select === 'Medoc') {
          navigate('/medoc');
      } else if (select === 'RdvP') {
          navigate('/rdvp');
      } else if (select === 'Historique') {
          navigate('/historique');
      } else if (select === 'Home') {
          navigate('/PrincP');
      } else if (select === 'Rdvacc') {
          navigate('/rdvacc');
      } else if (select === 'RdvStatus') {
          navigate('/rdvstatus');
      } else if (select === 'Consultday') {
        navigate('/consultday');
      } else if (select === 'InfoP') {
        navigate('/infop');
      }
    };

    // Toggle pour le sous-menu Rdv
  const toggleRdvP = () => {
    setIsRdvPOpen(!isRdvPOpen);
  };

     // Toggle pour le sous-menu Consultation
     const toggleConsult = () => {
      setIsConsultOpen(!isConsultOpen);
    };

    // Toggle pour le sous-menu Prescription
    const toggleprescr = () => {
      setIsprescOpen(!isprescOpen);
    };
    
    
  return (
    <aside className={`sidebar ${isOpen ? "open" : "closed"}`}>
      <ul>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={()=>handleCardSelection("Home")}>
            <SidebarItem  
            className="sidebar-item"
            icon={<img src="https://cdn-icons-png.flaticon.com/512/2948/2948025.png" alt="Home Icon" style={{ width: "40px", height: "40px",marginRight:"40px" }} />}  
            text="Home" 
            />
        </div>

        {/* Élément parent Consultation avec flèche */}
                <div onClick={toggleRdvP} className="sidebar-parent-item">
                  <SidebarItem
                    icon={<img src="   https://cdn-icons-png.flaticon.com/512/11815/11815686.png " alt="Rendez-Vous Icon" style={{ width: "35px", height: "35px", marginRight: "40px" }} />}
                    text="Rendez-Vous"
                    extraIcon={<FaChevronDown className={`arrowp ${isRdvPOpen ? "open" : ""}`} />}
                  />
                </div>
        
                {/* Sous-menu Renndez-Vous */}
                {isRdvPOpen && (
                  <ul className="submenu">
                    <li onClick={() => handleCardSelection("Rdvacc")}>
                      <SidebarItem
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/10208/10208662.png " alt="Rendez-Vous Icon" style={{ width: "30px", height: "30px", marginRight: "30px" }} />}
                        text="Mes Rendez-Vous"
                      />
                    </li>
                    <li onClick={() => handleCardSelection("RdvStatus")}>
                      <SidebarItem
                        icon={<img src="   https://cdn-icons-png.flaticon.com/512/1069/1069152.png " alt=" status Demandes Icon" style={{ width: "30px", height: "30px", marginRight: "30px" }} />}
                        text="Status Demandes"
                      />
                    </li>
                  </ul>
                )}


         {/* Élément parent ¨rescription avec flèche */}
                <div onClick={toggleprescr} className="sidebar-parent-item">
                  <SidebarItem
                    icon={<img src="https://cdn-icons-png.flaticon.com/512/8496/8496858.png" alt="planning Icon" style={{ width: "40px", height: "40px", marginRight: "40px" }} />}
                    text="Prescription du Medecin"
                    extraIcon={<FaChevronDown className={`arrow ${isConsultOpen ? "open" : ""}`} />}
                  />
                </div>
        
                {/* Sous-menu Prescription */}
                {isprescOpen && (
                  <ul className="submenu">
                    <li onClick={() => handleCardSelection("Ordrecep")}>
                      <SidebarItem
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/8302/8302424.png " alt="Ordonnance Icon" style={{ width: "30px", height: "30px", marginRight: "20px" }} />}
                        text="Mes Ordonnances"
                      />
                    </li>
                    <li onClick={() => handleCardSelection("Medoc")}>
                      <SidebarItem
                        icon={<img src="https://cdn-icons-png.flaticon.com/512/6946/6946547.png " alt="Medicaments Icon" style={{ width: "30px", height: "30px", marginRight: "20px" }} />}
                        text="Mes Medicaments"
                      />
                    </li>
                  </ul>
                )}

        <div onClick={()=>handleCardSelection("Consultday")}>
            <SidebarItem  
                className="sidebar-item"
                icon={<img src="https://cdn-icons-png.flaticon.com/512/3913/3913243.png" alt="consult Icon" style={{ width: "40px", height: "40px",marginRight:"40px" }} />}  
                text="Consultation Vidéo" 
            />
        </div>

        

        <div onClick={()=>handleCardSelection("Historique")}>
            <SidebarItem  
                className="sidebar-item"
                icon={<img src="https://cdn-icons-png.flaticon.com/512/4107/4107910.png " alt="Home Icon" style={{ width: "40px", height: "40px",marginRight:"40px" }} />}  
                text="Historique" 
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

export default Side;
