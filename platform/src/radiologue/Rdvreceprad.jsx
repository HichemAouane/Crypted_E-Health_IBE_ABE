import React, { memo, useState, useEffect} from 'react';
import NavbarProfilM from '../Commun/Navigation/NavbarProfilM';
import '../Medecin/Rdv/RdvM.css'
import OneRdv from '../Medecin/Rdv/OneRdv';
import Sidebarradio from "../Commun/Navigation/Sidebarradio";


const Rdvreceprad = memo((props) => {

    const [rdvs, setRdvs] = useState([]);
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    useEffect(() => {
       
        fetch(`http://localhost:5000/randez-vous-recep?medecin_id=${sessionStorage.getItem("profile_id")}`)
            .then(response => response.json())
            .then(data =>{setRdvs(data); console.log("Fetched RDVs:", data);} )
            .catch(error => console.error('Error fetching appointments:', error));
    }, []);

    return (
        <div>
            <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Sidebarradio isOpen={isSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
            <div className="Demandes-Container">
                <h1>Mes Demandes en Attentes</h1>
                <table className="Demandes-Table">
                    <thead>
                        <tr>
                            <th>Patient</th>
                            <th>Date</th>
                            <th>Type de RDV</th>
                            <th>Type de Consultation</th>
                            <th>Motif</th>
                            <th>Actions</th>
                        </tr>
                    </thead>
                    <tbody>
                        {rdvs.map((rdv, index) => (
                            <OneRdv key={index} rdv={rdv} />
                        ))}
                    </tbody>
            </table>
        </div>
            </main>
        </div>
    );
});


export default Rdvreceprad;

