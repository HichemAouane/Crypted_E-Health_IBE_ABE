import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Chat/Sidebarlist.css";
import NavbarProfilP from "../Commun/Navigation/NavbarProfilP";
import Sidebar from "../Commun/Navigation/Sidebar";

const ListMedecinOrd = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [medecins, setMedecins] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchMedecins = async () => {
      try {
        const patientId = sessionStorage.getItem("profile_id"); 
        const response = await axios.get(`http://localhost:5000/find/medecins/patient/${patientId}`);
        setMedecins(response.data);
      } catch (error) {
        console.error("Error fetching medecins:", error);
      }
    };

    fetchMedecins();
  }, []);

  return (
    <div>
      <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main style={{ marginTop: "115px" }} className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="chat-container">
          <div className={`sidebarlistP ${collapsed ? "collapsed" : ""}`}>
            <ul className="tab">
              <li className={activeIndex === 1 ? "selected" : ""} onClick={() => setActiveIndex(1)}>
                <strong>Mes Medecins & Ordonnances</strong>
              </li>
            </ul>

            <div className="tab-contentcP-ord">
              <ul>
                {medecins.length > 0 ? (
                  medecins.map((medecin) => (
                    <li key={medecin._id} >
                      <p style={{textAlign:"center",fontSize:"20px",fontWeight:"bold"}}>Dr. {medecin.nom} {medecin.prenom}</p>
                      <ul style={{marginTop:"20px"}}>
                        {medecin.ordonnances.length > 0 ? (
                          medecin.ordonnances.map((ord, index) => (
                            <li key={index} className="ordonnance-item"  onClick={() => navigate("/ordrecep", { state: { ord_info: ord }  })}>
                              <strong>Ordonnance {index + 1}:</strong>
                            </li>
                          ))
                        ) : (
                          <li className="no-ordonnance">Aucune ordonnance</li>
                        )}
                      </ul>
                    </li>
                  ))
                ) : (
                  <p>Aucun médecin trouvé.</p>
                )}
              </ul>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default ListMedecinOrd;
