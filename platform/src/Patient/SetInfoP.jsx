import React, { useState } from 'react';
import NavbarProfilP from "../Commun/Navigation/NavbarProfilP";
import Sidebar from "../Commun/Navigation/Sidebar";
import SetCompteP from './SetCompteP';

const SetInfoP = () => {
    const [collapsed, setCollapsed] = useState(false);
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
      const toggleSidebar = () => {
        setCollapsed(!collapsed);
      }
    
  return (
    <div >
      <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
           
        <SetCompteP />
        
    </main>
    </div>
  );
};

export default SetInfoP;
