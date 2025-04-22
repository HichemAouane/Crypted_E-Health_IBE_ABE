import React, { useState, useEffect } from "react";
import "../Chat/Sidebarlist.css";
import axios from "axios";
import NavbarProfilP from "../Commun/Navigation/NavbarProfilP";
import Sidebar from "../Commun/Navigation/Sidebar";
import { useNavigate, Link } from "react-router-dom";

const Consultday = ({ setpatId }) => {
    const navigate = useNavigate();
    const [collapsed, setCollapsed] = useState(false);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [medics, setMedics] = useState([]);
    const [selectedPatient, setSelectedPatient] = useState(null);
    const patientId = sessionStorage.getItem("profile_id");

    useEffect(() => {
        const fetchMedics = async () => {
            try {
                const today = new Date().toISOString().split("T")[0];
                const response = await fetch(
                    `http://localhost:5000/find/rendezvous/patient/side?patient_id=${patientId}&date_rv=${today}&type_consultation=Consultation%20en%20ligne%20(Vidéo)`
                );
                const data = await response.json();

                if (response.ok) {
                    setMedics(data.patients);
                } else {
                    console.error("Error fetching doctors:", data.message);
                }
            } catch (error) {
                console.error("Error:", error);
            }
        };

        fetchMedics();
    }, [patientId]);

    const handleConsultClick = async (medecinId) => {
      try {
        const response = await axios.post("http://localhost:5000/consultations", {
          patient_id: patientId,
          medecin_id: medecinId,
          date: new Date().toISOString(),
        });
  
        const consultationId = response.data._id;
        navigate(`/consult?medecin_id=${medecinId}&consultation_id=${consultationId}`);
      } catch (error) {
        console.error("Error creating consultation:", error);
      }
    };

    return (
        <div>
            <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Sidebar isOpen={isSidebarOpen} />
            <main style={{ marginTop: "115px" }} className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                <div className="chat-container">
                    <div className={`sidebarlistP ${collapsed ? "collapsed" : ""}`}>
                        <ul className="tab">
                            <li
                                className={activeIndex === 1 ? "selected" : ""}
                                onClick={() => setActiveIndex(1)}
                            >
                                <strong>Consultation du Jour</strong>
                            </li>
                        </ul>

                        {/* Contenu des onglets */}
                        <div className="tab-contentcP">
                            <ul>
                                {medics.length > 0 ? (
                                    medics.map((medic) => (
                                      <li key={medic.profile_id}>
                                      <div className="patient-info" style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
                                        
                                        <img
                                          className="profile-photo"
                                          src={medic.photo || "https://cdn-icons-png.flaticon.com/512/18827/18827851.png"}
                                          alt="Patient Profile"
                                          style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px", cursor: "pointer" }}
                                          onClick={() => setSelectedPatient(medic)}
                                        />
                                        
                                        <span style={{marginLeft:"50px",marginTop:"5px",fontSize:"25px"}}>{medic.nom} {medic.prenom}</span>
                                        {/* Consulter Button */}
                                        <button
                                          className="consult-button"
                                          style={{
                                            marginLeft: "auto",
                                            backgroundColor: "#007bff",
                                            color: "white",
                                            border: "none",
                                            padding: "5px 10px",
                                            borderRadius: "5px",
                                            cursor: "pointer",
                                          }}
                                          onClick={() =>{handleConsultClick(medic._id.$oid)}}
                                        >
                                          Consulter
                                        </button>
                                      </div>
                                    </li>
                                    ))
                                ) : (
                                    <p>Aucun médecin disponible pour aujourd'hui.</p>
                                )}
                            </ul>
                        </div>
                    </div>
                </div>
            </main>
            {selectedPatient && (
        <div className="popup-overlay">
          <div className="popup-content" style={{width: "50%", height: "100%", textAlign: "center"}}>
            <span className="popup-close" onClick={() => setSelectedPatient(null)}>&times;</span>
            <h2 style={{textAlign:"center",margin:"20px 0px"}}>Information De Profil</h2>
            <img
              className="profile-pic"
              src={selectedPatient.photo || "https://cdn-icons-png.flaticon.com/512/18827/18827851.png"}
              alt="Patient"
              style={{ width: "100px", height: "100px", borderRadius: "50%",marginLeft:"290px"} 
            }
              
            />
            <p style={{margin:"10px 0px"}}><strong>Nom:</strong> {selectedPatient.nom}</p>
            <p style={{margin:"10px 0px"}}><strong>Prenom:</strong> {selectedPatient.prenom}</p>
            <p style={{margin:"10px 0px"}}><strong>Date de naissance:</strong> {selectedPatient.datedenaissance}</p>
            <p style={{margin:"10px 0px"}}><strong>Sexe:</strong> {selectedPatient.sexe}</p>
            <p style={{margin:"10px 0px"}}><strong>Contact:</strong> {selectedPatient.contact}</p>
            <p style={{margin:"10px 0px"}}><strong>specialite:</strong> {selectedPatient.specialite}</p>
            <p style={{margin:"10px 0px"}}><strong>experience:</strong> {selectedPatient.experience}</p>
          </div>
        </div>
      )}
        </div>
    );
};

export default Consultday;
