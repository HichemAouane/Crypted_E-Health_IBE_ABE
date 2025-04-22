import React, { useState } from "react";
import { useNavigate ,Link} from 'react-router-dom';
import './RoleSelection.css';
import Navbar from '../Commun/Navigation/Navbar';
import Goback from '../Commun/Goback';
const ResetPassword = () => {
    const [formData, setFormData] = useState({
                email: ''
            });
    const navigate = useNavigate();


    return (
        <div>
            <Navbar />
            <Goback />
        <div className="auth-container">
            <h2>Donnez Votre Email</h2>
            <p>Entrez le Email associée à votre compte</p>
            <form >
                <input
                    type="email"
                    name="email"
                    value={formData.email}
                    placeholder="Email"
                    required
                    style={{width:"500px"}}
                />
            
                <button type="submit">Continuer</button>
                
            </form>
        </div>
        </div>
    );
}

export default ResetPassword