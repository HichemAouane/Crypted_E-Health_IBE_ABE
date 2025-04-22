import React, { useState, useEffect } from "react";
import "../Chat/Sidebarlist.css";
import axios from "axios";
import NavbarProfilM from "../Commun/Navigation/NavbarProfilM";
import SidebarM from "../Commun/Navigation/SidebarM";
import { useNavigate } from "react-router-dom";

const Data = () => {
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const currentMedecinId = sessionStorage.getItem("profile_id");

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  }

  useEffect(() => {
    const fetchPatients = async () => {
      try {
        const today = new Date().toISOString().split("T")[0];
        const response = await fetch(
          `http://localhost:5000/find/rendezvous?medecin_id=${currentMedecinId}&date_rv=${today}&type_consultation=Consultation%20Presentielle`
        );
        const data = await response.json();

        if (response.ok) {
          setPatients(data.patients);
        } else {
          console.error("Error fetching patients:", data.message);
        }
      } catch (error) {
        console.error("Error:", error);
      }
    };

    fetchPatients();
  }, [currentMedecinId]);

  const handleConsultClick = async (patientId) => {
    try {
      const response = await axios.post("http://localhost:5000/consultations", {
        patient_id: patientId,
        medecin_id: currentMedecinId,
        date: new Date().toISOString(),
      });

      const consultationId = response.data._id;
      navigate(`/ConsultP?patient_id=${patientId}&consultation_id=${consultationId}`);
    } catch (error) {
      console.error("Error creating consultation:", error);
    }
  };

  return (
    <div>
      <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarM isOpen={isSidebarOpen} />
      <main
        style={{ marginTop: "115px" }}
        className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}
      >
        <div className="chat-container">
          <div className={`sidebarlistP ${collapsed ? "collapsed" : ""}`}>
            <ul className="tab">
              <li
                className={activeIndex === 1 ? "selected" : ""}
                onClick={() => setActiveIndex(1)}
              >
                <strong>Patients du Jour</strong>
              </li>
            </ul>

            <div className="tab-contentcP">
              <ul>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <li key={patient.profile_id}>
                      <div
                        className="patient-info"
                        style={{display:"flex",alignContent:"center",justifyContent:"center"}}
                      >
                        <img
                          className="profile-photo"
                          src={patient.photo || "https://cdn-icons-png.flaticon.com/512/18827/18827851.png"}
                          alt="Patient Profile"
                          style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px", cursor: "pointer" }}
                          onClick={() => setSelectedPatient(patient)}
                        />
                        <span style={{marginLeft:"50px",marginTop:"5px",fontSize:"25px"}}>{patient.nom} {patient.prenom}</span>
                        <button
                          className="consult-button"
                          style={{
                            backgroundColor: "#007bff",
                            color: "white",
                            border: "none",
                            padding: "5px 10px",
                            borderRadius: "5px",
                            cursor: "pointer",
                          }}
                          onClick={() => handleConsultClick(patient._id.$oid)}
                        >
                          Consulter
                        </button>
                      </div>
                    </li>
                  ))
                ) : (
                  <p>Aucun patient avec consultation présentielle aujourd'hui.</p>
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
            <p style={{margin:"10px 0px"}}><strong>Contact D'urgence:</strong> {selectedPatient.contacturgence}</p>
            <p style={{margin:"10px 0px"}}><strong>Poids:</strong> {selectedPatient.poids.valeur}</p>
            <p style={{margin:"10px 0px"}}><strong>Taille:</strong> {selectedPatient.taille.valeur}</p>
            <p style={{margin:"10px 0px"}}><strong>Antécédents Médicaux:</strong> {selectedPatient.otherDiseases || "Aucun"}</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default Data;
