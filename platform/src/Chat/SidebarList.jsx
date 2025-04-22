import React, { useState } from "react";

const SidebarList = ({ medics, patients, setRecipientId, selectedRecipient }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);



  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebarlist ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btnd" onClick={toggleSidebar}>
        {collapsed ? "←" : "→"}
      </button>
      
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
      <div className="tab-contentc">
        {activeIndex === 0 ? (
          <ul>
            {(medics || []).map((medic) => (
              <li key={medic.profile_id} 
              onClick={() => { 
                setRecipientId(medic.profile_id);
              }}
              className={selectedRecipient === medic.profile_id ? "selectedM-user" : ""}
            >
                {medic.name}
              </li>
            ))}
          </ul>
        ) : (
          <ul>
            {(patients || []).map((patient) => (
              <li key={patient.profile_id} 
              onClick={() => { 
                setRecipientId(patient.profile_id);
              }}
              className={selectedRecipient === patient.profile_id ? "selectedM-user" : ""}
            >
                {patient.name}
              </li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
};

export default SidebarList;

