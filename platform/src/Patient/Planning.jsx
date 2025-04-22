import React, { memo,useState} from 'react';
import { useNavigate } from 'react-router-dom';
import Sidebar from '../Commun/Navigation/Sidebar';
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP';

const Planning = memo((props) => {
    const navigate = useNavigate();
    const profile_id = localStorage.getItem("profile_id");
    const user_email = localStorage.getItem("user_email");
    const handleCardSelection = (select) => {
        if (select === 'Ordrecep') {
            navigate('/Ordrecep');
        } else if (select === 'Medoc') {
            navigate('/medoc');
        } 
        
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
      return (
        <div>
          <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Sidebar isOpen={isSidebarOpen} />
          <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
          <div style={{marginTop:"10px"}} className="Select-selection-container">
                <div className="Select-cards">
                    {/* Carte pour le forum Patient*/}
                    <div className="Select-card" onClick={() => handleCardSelection('Ordrecep')}>
                    <img
                       src="https://cdn-icons-png.flaticon.com/512/3209/3209937.png"
                       alt="Ordrecep"
                       className="Select-icon"
                    />
                     <h2>Ordonnance</h2>
                     <p>Consultez Votre Ordonnance</p>
                    </div>
    
                    {/* Carte pour le Planning des medicament */}
                    <div className="Select-card" onClick={() => handleCardSelection('Medoc')}>
                    <img
                       src="https://cdn-icons-png.flaticon.com/512/3788/3788892.png" 
                       alt="Medoc"
                       className="Select-icon"
                    />
                    <h2>Accéder au medicaments du Medecin</h2>
                    <p>Suivez Votre Routine Medical</p>
                    </div>
                </div>
            </div>
          </main>
        </div>
      );
   
});



export default Planning;