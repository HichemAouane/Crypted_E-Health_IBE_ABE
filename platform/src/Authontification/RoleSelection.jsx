import React from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import './RoleSelection.css';
import Navbar from '../Commun/Navigation/Navbar';
import Goback from '../Commun/Goback';

const RoleSelection = () => {
    const navigate = useNavigate();

    // Fonction pour rediriger vers Med.jsx ou Patient.jsx
    const handleRoleSelection = (role) => {
        if (role === 'doctor') {
            navigate('/signupmed');
        } else if (role === 'patient') {
            navigate('/signuppat');
        }
    };

    return (
        <div>
        <Navbar/>
        <Goback />
        <div className="role-selection-container">
            <h1 >Choose your role</h1>
            <div className="role-cards">
                {/* Carte pour le médecin */}
                <div className="role-card" onClick={() => handleRoleSelection('doctor')}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2785/2785482.png"
                        alt="Doctor"
                        className="role-icon"
                    />
                    <h2>Je suis un Docteur</h2>
                    <p>M'inscrire autant que prestataire de soins de santé</p>
                </div>

                {/* Carte pour le patient */}
                <div className="role-card" onClick={() => handleRoleSelection('patient')}>
                    <img
                        src="https://cdn-icons-png.flaticon.com/512/2750/2750657.png "
                        alt="Patient"
                        className="role-icon"
                    />
                    <h2>Je suis un Patient</h2>
                    <p>M'inscrire comme patient</p>
                </div>
            </div>
        </div>
     </div>
    );
};

export default RoleSelection;