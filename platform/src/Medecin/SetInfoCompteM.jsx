import React, { useState, useEffect  }from 'react'
import { useNavigate } from 'react-router-dom';
import './Profile.css'

const SetInfoCompteM= () => {
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


  
 
  
  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };
  

  const handlePhotoChange = async (e) => {
    const file = e.target.files[0];

    if (file) {
        const reader = new FileReader();
        reader.onloadend = async () => {
            const newPhotoUrl = reader.result;
            setNewPhoto(newPhotoUrl);  

            const profileId = sessionStorage.getItem("profile_id");
            const accountType = sessionStorage.getItem("typedecompte"); 

            if (!profileId || !accountType) {
                alert("Profile ID or account type missing!");
                return;
            }

   
            try {
                const response = await fetch("http://localhost:5000/update-photo", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({
                        profile_id: profileId,
                        image: newPhotoUrl,
                        role: accountType,
                    }),
                });

                const data = await response.json();
                if (!response.ok) {
                    alert("Error updating photo: " + data.error);
                    return;
                }

                alert("Profile photo updated!");
                setUser((prev) => ({ ...prev, photo: newPhotoUrl }));   

            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while updating the profile photo.");
            }
        };

        reader.readAsDataURL(file);
    }
};


const handleSave = async () => {
  const profileId = sessionStorage.getItem("profile_id");
  if (!profileId) return alert("Profile ID is missing!");

  const updatedData = { profile_id: profileId };
  if (user.email) updatedData.email = user.email;

  try {
      const response = await fetch("http://localhost:5000/update-user", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedData),
      });

      const data = await response.json();

      if (!response.ok) {
          return alert("Error updating profile: " + data.error);
      }

      alert("Profile updated successfully!");

  
      if (data.logout) {
          alert("Email changed! You will be logged out.");
          sessionStorage.clear();
          window.location.href = "/choice"
      }else {
        window.location.reload(); 
    }

  } catch (error) {
      console.error("Error:", error);
  }
};
 

  return (

        <div className='content-info' style={{borderRadius:"7px"}}>
            
            <input type="file" id="fileInput" className="hidden" onChange={handlePhotoChange} style={{ display: "none" }} />

            <div style={{display:"flex",alignItems:"center", marginTop:"10px", marginLeft:"10px"}}>

              <button style={{width:"200px", padding:"15px"}} onClick={() => document.getElementById("fileInput").click()}>
                Changer photo de profile
              </button>
              <img className='acc-profile-img-changer' src={user.photo} alt="Profile" />
              
            </div>
            
            <input
              type="email"
              name="email"
              value={user.email}
              onChange={handleChange}
              
            />
        
                  
            <span className="switch-link" onClick={()=>Navigate("/Reset-password")}>Changé mot de passe</span>
            <button onClick={handleSave} >
              Sauvegarder
            </button>
          </div>
        

  );
}

export default SetInfoCompteM
