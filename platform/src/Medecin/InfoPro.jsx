import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';


const Infomed = (props) => {
    
   const [user, setUser] = useState({
    specialite: '',
    experience:'',
    hopital: [],
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
                    console.log("Fetched user data:", data,"qqqqqqqqqxx",data.hopital,"qqqqqqqqqxx",data.specialite);

                    setUser((prevUser) => ({
                        ...prevUser,
                        specialite: data.specialite || "",
                        experience: data.experience || "",
                        hopital: data.hopital || "",
                    }));

                    console.log(data.hopital,"qqqqqqqqqxx",data.specialite)

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
                    <p><strong>Speciality:</strong> {user.specialite}</p>
                    <p><strong>Experience:</strong> {user.experience}</p>
                    {user.hopital.map((input, index) => (
                        <p><strong>Hôpital {index+1}:</strong> {input}</p>
                    ))}
                </div>
            </div>
        </div>
       
    );
};

export default Infomed;
