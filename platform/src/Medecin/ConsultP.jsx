import React, { useState } from "react";
import { useLocation } from "react-router-dom";
import "./ConsultV.css";
import SidebarM from "../Commun/Navigation/SidebarM";
import NavbarProfilM from "../Commun/Navigation/NavbarProfilM";
import Ordonnance from "./Ordonnance";
import Constante from "./Constante";
import Rapport from "./Rapport";
import Hist from "../Patient/Hist"

const ConsultP = () => {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const searchParams = new URLSearchParams(location.search);
  const patient_id = searchParams.get("patient_id");
  const consultation_id = searchParams.get("consultation_id");
  const [activeTab, setActiveTab] = useState("Historique");

  return (
    <div>
      <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarM isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="contentp">
          <div className="Btnchoixp">
          <button className={'Historiquep ${activeTab === "Historique" ? "active" : ""}'} onClick={() => setActiveTab("Historique")}>Patient</button>
            <button className={'Ordonancep ${activeTab === "Ordonnance" ? "active" : ""}'} onClick={() => setActiveTab("Ordonnance")}>Ordonnance</button>
            <button className={'Rapportp ${activeTab === "Rapport" ? "active" : ""}'} onClick={() => setActiveTab("Rapport")}>Rapport</button>
          </div>

         
            {activeTab === "Historique" && <Hist patientId={patient_id} />}
            {activeTab === "Ordonnance" && <Ordonnance patientId={patient_id} consultationId={consultation_id} />}
            {activeTab === "Rapport" && <Rapport patientId={patient_id} consultationId={consultation_id} />}

         
        </div>
      </main>
    </div>
  );
};

export default ConsultP;
