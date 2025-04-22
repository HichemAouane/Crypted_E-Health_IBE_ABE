import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import NavbarProfilM from "../Commun/Navigation/NavbarProfilM";
import SidebarM from "../Commun/Navigation/SidebarM";
import Compte from './Compte';

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
        
        <div className='info'>  
        
        <Compte />
        
        <Link to="/SetInfoM">
            <img className="imgedit" src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png "/>
        </Link>
        
        
        </div>
        
    </main>
    </div>
  );
};

export default Info;
