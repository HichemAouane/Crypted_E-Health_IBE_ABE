import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "../Chat/Sidebarlist.css";
import NavbarProfilM from "../Commun/Navigation/NavbarProfilM";
import SidebarM from "../Commun/Navigation/SidebarM";

const ListPat = () => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [patients, setPatients] = useState([]);
  const [selectedPatient, setSelectedPatient] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPatients = async () => {
      const medecinId = sessionStorage.getItem("profile_id");
      if (!medecinId) return;

      try {
        const response = await axios.get(`http://localhost:5000/medecin/patients?medecin_id=${medecinId}`);
        setPatients(response.data);
      } catch (error) {
        console.error("Error fetching patients:", error);
      }
    };

    fetchPatients();
  }, []);


  const handleConsultClick = async (patientId) => {
    try {
      const medecinId = sessionStorage.getItem("profile_id");

      const response = await axios.post("http://localhost:5000/consultations", {
        patient_id: patientId,
        medecin_id: medecinId,
        date: new Date().toISOString(),
      });

      const consultationId = response.data._id;

      navigate(`/consultv?patient_id=${patientId}&consultation_id=${consultationId}`);
    } catch (error) {
      console.error("Error creating consultation:", error);
    }
  };



  return (
    <div>
      <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarM isOpen={isSidebarOpen} />
      <main style={{ marginTop: "115px" }} className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="chat-container">
          <div className={`sidebarlistP ${collapsed ? "collapsed" : ""}`}>
            <ul className="tab">
              <li className={activeIndex === 1 ? "selected" : ""} onClick={() => setActiveIndex(1)}>
                <strong>Mes Patients</strong>
              </li>
            </ul>

            <div className="tab-contentcP">
              <ul>
                {patients.length > 0 ? (
                  patients.map((patient) => (
                    <li key={patient._id} className="patient-item" onClick={() => setSelectedPatient(patient)}>
                       <div className="patient-info" style={{display:"flex",alignContent:"center",justifyContent:"center"}}>
                  
                  <img
                    className="profile-photo"
                    src={patient.photo || "https://cdn-icons-png.flaticon.com/512/18827/18827851.png"}
                    alt="Patient Profile"
                    style={{ width: "50px", height: "50px", borderRadius: "50%", marginRight: "10px", cursor: "pointer" }}
                    onClick={() => setSelectedPatient(patient)}
                  />
                  
                  <span style={{marginLeft:"50px",marginTop:"5px",fontSize:"25px"}}>{patient.nom} {patient.prenom}</span>          
                </div>
              </li>
            ))
          ) : (
            <p>Aucun patient avec consultation vidéo aujourd'hui.</p>
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

export default ListPat;
