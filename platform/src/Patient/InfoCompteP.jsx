import React, { useState, useEffect  }from 'react'
import { useNavigate } from 'react-router-dom';


const InfoCompteP = () => {
  const [user, setUser] = useState({
    email: "",
    photo: "",
  });

  const [loading, setLoading] = useState(true);
  const [newPhoto, setNewPhoto] = useState(null);
  const Navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

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
            email: data.email || "",
            photo: data.photo || prevUser.photo, 
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

    <div className='content-infoP' style={{borderRadius:"7px"}}>
            <div style={{ display: "flex" }}>
                <div>
                    <div style={{ display: "flex", flexDirection: "column", alignItems: "center" }}>
                        <img className='acc-profile-img' src={user.photo} alt="Profile" />
                    </div>
            
                    <p><strong>Email:</strong> {user.email}</p>

                </div>
            </div>
        </div>
    );
};

export default InfoCompteP;
