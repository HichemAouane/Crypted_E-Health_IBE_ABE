import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Infoperso = (props) => {
    
    const [user, setUser] = useState({
        nom: "",
        prenom: "",
        sexe: "",
        datedenaissance: "",
        contact: "",
    });
    
    const [loading, setLoading] = useState(true);
    const Navigate = useNavigate();

    useEffect(() => {
        const fetchUserData = async () => {
            const profileId = sessionStorage.getItem("profile_id");
            if (!profileId) return;
      
            try {
                const response = await fetch(`http://localhost:5000/get-user-info?profile_id=${profileId}`);
                const data = await response.json();
      
                if (response.ok) {
                    console.log("Fetched user data:", data);

                    setUser((prevUser) => ({
                        ...prevUser,
                        nom: data.nom || "",
                        prenom: data.prenom || "",
                        sexe: data.sexe || "",
                        datedenaissance: data.datedenaissance || "",
                        contact: data.contact || "",
                    }));

                } else {
                    console.error("Error fetching user data:", data.error);
                }
            } catch (error) {
                console.error("Error:", error);
            } finally {
                setLoading(false);
            }
        };
      
        fetchUserData();
    }, []);
      
    if (loading) {
        return null;
    }

    return (
        
        <div className='content-info' style={{borderRadius:"7px"}}>
            <div style={{ display: "flex" }}>
                <div>
                    <p><strong>Nom:</strong> {user.nom}</p>
                    <p><strong>Prénom:</strong> {user.prenom}</p>
                    <p><strong>Sexe:</strong> {user.sexe}</p>
                    <p><strong>Date de naissance:</strong> {user.datedenaissance}</p>
                    <p><strong>Téléphone:</strong> {user.contact}</p>
                </div>
            </div>
        </div>
       
    );
};

export default Infoperso;
