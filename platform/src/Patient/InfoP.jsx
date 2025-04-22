import React, { useState } from 'react';
import { useNavigate, Link } from "react-router-dom";
import NavbarProfilP from "../Commun/Navigation/NavbarProfilP";
import Sidebar from "../Commun/Navigation/Sidebar";
import Hist from './Hist';

const InfoP = () => {
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
        
        <div className='info'>  
        
        <Hist />
        
        <Link to="/SetInfoP">
            <img className="imgedit" src="https://cdn-icons-png.flaticon.com/512/1827/1827933.png "/>
        </Link>
        
        
        </div>
        
    </main>
    </div>
  );
};

export default InfoP;
