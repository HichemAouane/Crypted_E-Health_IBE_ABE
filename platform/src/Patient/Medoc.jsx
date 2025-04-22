import React, {useState,useEffect} from 'react';
import Sidebar from "../Commun/Navigation/Sidebar";
import NavbarProfilP from "../Commun/Navigation/NavbarProfilP";
import OneMedoc from './OneMedoc';

const Medoc = () => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const [medicaments, setMedicaments] = useState([]);
    const patientId = sessionStorage.getItem("profile_id");

    useEffect(() => {
        const fetchMedicaments = async () => {
            try {
                const response = await fetch(`http://localhost:5000/getMedicaments/${patientId}`);
                const data = await response.json();
                setMedicaments(data);
            } catch (error) {
                console.error("Error fetching medicaments:", error);
            }
        };

        if (patientId) {
            fetchMedicaments();
        }
    }, [patientId]);

    return (
        <div>
            <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
            <Sidebar isOpen={isSidebarOpen} />
            <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                <div className='Demandes-Containerp'>
                    <div className='Decop'>
                        <h1>Mes Médicaments</h1>
                    </div>
                    <table className="Demandes-Tablep">
                        <thead>
                            <tr>
                                <th>Date de Prescription</th>   
                                <th>Medecin</th>   
                                <th>Medicament</th>                             
                                <th>Dossage</th>
                                <th>Posologie</th>
                                <th>Momment</th>
                                <th>Durée</th>
                                <th>Description</th>
                                <th>Subtituable</th>
                            </tr>
                        </thead>
                        <tbody>
                            
                            {medicaments.map((med, index) => (
                                <OneMedoc key={index} med={med} />
                            ))}
                            
                        </tbody>
                    </table>
                </div>
            </main>
        </div>
         
        
    );
}

export default Medoc