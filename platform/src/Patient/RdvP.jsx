import React, { memo,useState} from 'react';
import Sidebar from '../Commun/Navigation/Sidebar';
import { useNavigate } from 'react-router-dom';
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP';

const RdvP = memo((props) => {
    const navigate = useNavigate();
    
    // Fonction pour rediriger vers ce qu'on choisis
    const handleCardSelection = (select) => {
        if (select === 'Rdvaccepte') {
            navigate('/rdvacc');
        } else if (select === 'RdvAtt') {
            navigate('/rdvatt');
        } else if (select === 'Rdvdem') {
            navigate('/Rdvdem');
        }
        
    };
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    
      return (
        <div>
          <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
          <Sidebar isOpen={isSidebarOpen} />
          <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
          <div className="Select-selection-container">
            <div className="Select-cards">
                {/* Carte pour le Planning des Rendez-Vous */}
                <div className="Select-card" onClick={() => handleCardSelection('Rdvaccepte')}>
                <img
                   src="https://cdn-icons-png.flaticon.com/512/16950/16950690.png"
                   alt="Rdv"
                   className="Select-icon"
                />
                <h2>Mes Future Rendez-Vous</h2>
                <p>Consultation en ligne</p>
                <p>Consultation en Presentiel</p>
                </div>

                {/* Carte pour le Demande de Rendez-Vous */}
                <div className="Select-card" onClick={() => handleCardSelection('RdvAtt')}>
                <img
                   src="https://cdn-icons-png.flaticon.com/512/3203/3203244.png "
                   alt="RdvAtt"
                   className="Select-icon"
                />
                <h2>Status de mes Demandes de Rendez-Vous</h2>
                <p>Status : Attente</p>
                <p>Status : Refuser</p>
                </div>

                {/* Carte pour le Demande de Rendez-Vous */}
                <div className="Select-card" onClick={() => handleCardSelection('Rdvdem')}>
                <img
                   src="https://cdn-icons-png.flaticon.com/512/3203/3203244.png "
                   alt="Rdvdem"
                   className="Select-icon"
                />
                <h2>Faire une demandes de Rendez-Vous</h2>
                <p>Consultation en ligne</p>
                <p>Consultation en Presentiel</p>
                </div>
            
            </div>
        </div>
          </main>
        </div>
      );

   
});

export default RdvP;