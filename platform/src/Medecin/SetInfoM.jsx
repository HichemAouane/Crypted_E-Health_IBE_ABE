import React, { useState } from 'react';
import NavbarProfilM from "../Commun/Navigation/NavbarProfilM";
import SidebarM from "../Commun/Navigation/SidebarM";
import SetCompte from './SetCompte';

const Info = () => {
    const [collapsed, setCollapsed] = useState(false);
      const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
      const toggleSidebar = () => {
        setCollapsed(!collapsed);
      }
    
  return (
    <div >
      <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarM isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
           
        <SetCompte />
        
    </main>
    </div>
  );
};

export default Info;
