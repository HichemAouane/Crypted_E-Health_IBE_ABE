import React, { useState } from "react";
import "./Sidebarlist.css"

const OnePat = ({ medics, patients, setRecipientId }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebarlistP ${collapsed ? "collapsed" : ""}`}>
      
      <ul className="tab-menu">
        <li
          className={activeIndex === 0 ? "selected" : ""}
          onClick={() => setActiveIndex(0)}
        >
          Médecins
        </li>
        <li
          className={activeIndex === 1 ? "selected" : ""}
          onClick={() => setActiveIndex(1)}
        >
          Patients
        </li>
      </ul>

      {/* Contenu des onglets */}
      <div className="tab-contentcP">
        {activeIndex === 0 ? (
          <ul>
            {(medics || []).map((medic) => (
              <li key={medic.profile_id} onClick={() => setRecipientId(medic.profile_id)}>
                {medic.name}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {(patients || []).map((patient) => (
              <li key={patient.profile_id} onClick={() => setRecipientId(patient.profile_id)}>
                {patient.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default OnePat;

