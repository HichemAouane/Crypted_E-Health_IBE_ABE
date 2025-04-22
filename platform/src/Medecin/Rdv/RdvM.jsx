import React, { memo,useState } from 'react';
import { useNavigate } from 'react-router-dom';
import "../PrincM.css"
import NavbarProfilM from '../../Commun/Navigation/NavbarProfilM';
import PropTypes from 'prop-types';
import SidebarM from "../../Commun/Navigation/SidebarM";

const RdvM = memo((props) => {
    

         const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div>
        <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <SidebarM isOpen={isSidebarOpen} />
        <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        
       
        </main>
        </div>
    );
});

export default RdvM;