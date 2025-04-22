import React, { memo, useState, useEffect } from 'react';
import NavbarProfilM from '../../Commun/Navigation/NavbarProfilM';
import './RdvM.css';
import OneRdvC from './OneRdvC';
import AddRdv from './AddRdv';
import SidebarM from "../../Commun/Navigation/SidebarM";

const Rdvactuel = memo(() => {
    const [rdvs, setRdvs] = useState([]); 
    const [isPopupOpen, setIsPopupOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);


    useEffect(() => {
        fetch(`http://localhost:5000/rendez-vous-medecin?medecin_id=${sessionStorage.getItem("profile_id")}`)
            .then(response => response.json())
            .then(data => {setRdvs(data); console.log(data)})
            .catch(error => console.error("Error fetching accepted appointments:", error));
    }, []);


    return (
        <div>
            <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <SidebarM isOpen={isSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                <div className='Demandes-Container'>
                    <div className='Deco'>
                        <h1>Mes Future Rendez-Vous</h1>
                        <button className="btn-open" onClick={() => setIsPopupOpen(true)}> 
                            <h3>Ajouter Un Rendez-Vous</h3> 
                        </button>
                    </div>
                    <table className="Demandes-Table">
                        <thead>
                            <tr>
                                <th>Patient</th>
                                <th>Date</th>
                                <th>Heure</th>
                                <th>Hopital</th>
                                <th>Type de RDV</th>
                                <th>Type de Consultation</th>
                                <th>Motif</th>
                                <th>Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rdvs.map((rdv, index) => (
                                <OneRdvC key={index} rdv={rdv} />
                            ))}
                        </tbody>
                    </table>
                </div>
            </main>

            {/* Cadre flottant (popup interne) */}
            {isPopupOpen && (
                <div className="popup-overlay">
                    <div className="popup-content">
                        <button className="popup-close" onClick={() => setIsPopupOpen(false)}>X</button>
                        <AddRdv />
                    </div>
                </div>
            )}
        </div>
         
        
    );
});


export default Rdvactuel;

