import React, { useState } from "react";

const SidebarListG = ({ medics, setRecipientId, selectedRecipient }) => {
  const [collapsed, setCollapsed] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);



  const toggleSidebarM = () => {
    setCollapsed(!collapsed);
  };

  return (
    <div className={`sidebarlist ${collapsed ? "collapsed" : ""}`}>
      <button className="toggle-btnd" onClick={toggleSidebarM}>
        {collapsed ? "←" : "→"}
      </button>
      
      <ul className="tab">
        <li
          className={activeIndex === 1 ? "selected" : ""}
          onClick={() => setActiveIndex(1)}
        >
          <srong>Médecins</srong>
        </li>
      </ul>

      {/* Contenu des onglets */}
      <div className="tab-contentg">
          <ul>
            {(medics || []).map((medic) => (
              <li key={medic.profile_id} 
              onClick={() => { 
                setRecipientId(medic.profile_id);
              }}
              className={selectedRecipient === medic.profile_id ? "selected-user" : ""}
            >
                {medic.name}
              </li>
            ))}
          </ul>
      </div>
    </div>
  );
};

export default SidebarListG;

