import React, { memo,useState} from 'react';
import Sidebar from '../Commun/Navigation/Sidebar';
import { useNavigate} from 'react-router-dom';
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP';
import "./PrincP.css"


const PrincP = memo((props) => {
    const navigate = useNavigate();
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
 

    return (
      <div>
        <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
        <Sidebar isOpen={isSidebarOpen} />
        <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                    
        </main>
      </div>
    );      
});



export default PrincP;