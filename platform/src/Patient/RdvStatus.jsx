import React, { memo, useState, useEffect } from 'react';
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP';
import './Rdv.css';
import Sidebar from "../Commun/Navigation/Sidebar";
import OnerdvS from './OnerdvS';

const RdvStatus = memo(() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [rdvs, setRdvs] = useState([]);

    useEffect(() => {
        fetch(`http://localhost:5000/rendez-vous-en-attente-refuse?patient_id=${sessionStorage.getItem("profile_id")}`)
            .then(response => response.json())
            .then(data => setRdvs(data))
            .catch(error => console.error("Error fetching pending appointments:", error));
    }, []);

    return (
        <div>
            <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                <div className='Demandes-Containerp'>
                    <div className='Decop'>
                        <h1>Mes Future Rendez-Vous</h1>
                    </div>
                    <table className="Demandes-Tablep">
                        <thead>
                            <tr>
                                <th>Medecin</th>
                                <th>Date</th>
                                <th>Type de RDV</th>
                                <th>Type de Consultation</th>
                                <th>Motif</th>
                                <th>Status</th>
                            </tr>
                        </thead>
                        <tbody>
                            {rdvs.map((rdv, index) => (
                                <OnerdvS key={index} rdv={rdv} />
                            ))}
                        </tbody>
                    </table>
                </div>
                </main>
        </div>
         
        
    );
});

RdvStatus.propTypes = {};

export default RdvStatus;

