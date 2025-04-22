import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaHome, FaCompass, FaFilm, FaHistory, FaPlayCircle, FaList, FaChevronDown } from "react-icons/fa";
import "./SidebarM.css";

const SidebarM = ({ isOpen }) => {
  const navigate = useNavigate();
  const [isConsultOpen, setIsConsultOpen] = useState(false);
  const [isRdvOpen, setIsRdvOpen] = useState(false);

  // Fonction de redirection en fonction du choix
  const handleCardSelection = (select) => {
    if (select === "ChatM") {
      navigate("/chatm");
    } else if (select === "ListPat") {
      navigate("/listpat");
    } else if (select === "Rdvactuel") {
      navigate("/rdvactuel");
    } else if (select === "Rdvrecep") {
        navigate("/rdvrecep");
    } else if (select === "Home") {
      navigate("/PrincM");
    } else if (select === "Datav") {
      navigate("/datav");
    } else if (select === "Data") {
      navigate("/data");
    }
  };

  // Toggle pour le sous-menu Consultation
  const toggleConsult = () => {
    setIsConsultOpen(!isConsultOpen);
  };

  // Toggle pour le sous-menu Rdv
  const toggleRdv = () => {
    setIsRdvOpen(!isRdvOpen);
  };

  return (
    <aside className={`sidebarm ${isOpen ? "open" : "closed"}`}>
      <ul>
        <div style={{ display: "flex", alignItems: "center", gap: "10px" }} onClick={() => handleCardSelection("Home")}>
          <SidebarItem
            icon={<img src="https://cdn-icons-png.flaticon.com/512/2948/2948025.png" alt="Home Icon" style={{ width: "40px", height: "40px", marginRight: "40px" }} />}
            text="Home"
          />
        </div>

        {/* Élément parent Consultation avec flèche */}
        <div onClick={toggleRdv} className="sidebarm-parent-item">
          <SidebarItem
            icon={<img src="https://cdn-icons-png.flaticon.com/512/10208/10208662.png" alt="Rendez-Vous Icon" style={{ width: "40px", height: "40px", marginRight: "40px" }} />}
            text="Rendez-Vous"
            extraIcon={<FaChevronDown className={`arrow ${isConsultOpen ? "open" : ""}`} />}
          />
        </div>

        {/* Sous-menu Consultation */}
        {isRdvOpen && (
          <ul className="submenum">
            <li onClick={() => handleCardSelection("Rdvactuel")}>
              <SidebarItem
                icon={<img src="https://cdn-icons-png.flaticon.com/512/8302/8302424.png " alt="Rendez-Vous Actuel Icon" style={{ width: "30px", height: "30px", marginRight: "20px" }} />}
                text="Mes Rendez-Vous"
              />
            </li>
            <li onClick={() => handleCardSelection("Rdvrecep")}>
              <SidebarItem
                icon={<img src="https://cdn-icons-png.flaticon.com/512/6946/6946547.png " alt="Rendez-Vous Demande Icon" style={{ width: "30px", height: "30px", marginRight: "20px" }} />}
                text="Demande Rendez-Vous"
              />
            </li>
          </ul>
        )}


        <div onClick={() => handleCardSelection("ListPat")}>
          <SidebarItem
            icon={<img src="https://cdn-icons-png.flaticon.com/512/18376/18376182.png" alt="Patient Icon" style={{ width: "40px", height: "40px", marginRight: "40px" }} />}
            text="Patient"
          />
        </div>

        {/* Élément parent Consultation avec flèche */}
        <div onClick={toggleConsult} className="sidebar-parent-item">
          <SidebarItem
            icon={<img src="https://cdn-icons-png.flaticon.com/512/2418/2418174.png" alt="Consultation Icon" style={{ width: "40px", height: "40px", marginRight: "40px" }} />}
            text="Consultation"
            extraIcon={<FaChevronDown className={`arrow ${isConsultOpen ? "open" : ""}`} />}
          />
        </div>

        {/* Sous-menu Consultation */}
        {isConsultOpen && (
          <ul className="submenum">
            <li onClick={() => handleCardSelection("Datav")}>
              <SidebarItem
                icon={<img src="https://cdn-icons-png.flaticon.com/512/3913/3913243.png" alt="Consultation Vidéo Icon" style={{ width: "30px", height: "30px", marginRight: "20px" }} />}
                text="Consultation Vidéo"
              />
            </li>
            <li onClick={() => handleCardSelection("Data")}>
              <SidebarItem
                icon={<img src="https://cdn-icons-png.flaticon.com/512/9787/9787831.png" alt="Consultation Présentiel Icon" style={{ width: "30px", height: "30px", marginRight: "20px" }} />}
                text="Consultation Présentiel"
              />
            </li>
          </ul>
        )}


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

export default SidebarM;
