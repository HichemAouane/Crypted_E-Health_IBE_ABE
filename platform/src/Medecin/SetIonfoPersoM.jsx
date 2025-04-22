import React, { useState, useEffect  }from 'react'
import NavbarProfilM from '../Commun/Navigation/NavbarProfilM'
import { useNavigate } from 'react-router-dom';
import SidebarM from "../Commun/Navigation/SidebarM";
import './Profile.css'

const SetInfoPersoM = () => {
  const [user, setUser] = useState({
    nom: "",
    prenom:"",
    sexe:"",
    datedenaissance:"",
    contact:"",
    contacturgence:"",
  });

  const [loading, setLoading] = useState(true);
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
            nom: data.nom || "",
            prenom: data.prenom || "",
            sexe: data.sexe || "",
            datedenaissance: data.datedenaissance || "",
            contact: data.contact || "",
            contacturgence: data.contacturgence || "",
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
  
    if (name === "contact") {
 
      if (!/^[0-9]{0,10}$/.test(value)) return;

      setUser({ ...user, [name]: value });
    }

    if (name === "contacturgence") {
 
      if (!/^[0-9]{0,10}$/.test(value)) return;
      setUser({ ...user, [name]: value });
    }
  
  };
  


const handleSave = async () => {
  const profileId = sessionStorage.getItem("profile_id");
  if (!profileId) return alert("Profile ID is missing!");

  const updatedData = { profile_id: profileId };
  if (user.contact) updatedData.contact = user.contact;
  if (user.contacturgence) updatedData.contacturgence = user.contacturgence;

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
            
            <input
              type="text"
              name="nom"
              value={user.nom}
              onChange={handleChange}
              disabled
              
            />
            <input
              type="text"
              name="prenom"
              value={user.prenom}
              onChange={handleChange}
              disabled
              
            />
            <select
                name="sexe"
                value={user.sexe}
                onChange={handleChange}
                disabled
            >

            <option value="Masculin">
                Masculin
            </option>

            <option value="Féminin">
                Féminin
            </option>

            </select>
            <input
                type="date"
                name="datedenaissance"
                placeholder="Date de naissance"
                value={user.datedenaissance}
                onChange={handleChange}
                disabled
            />

            <input
              type="tel"
              name="contact"
              placeholder='Numéro de telephone'
              value={user.contact}
              onChange={handleChange}
            />

                  
           
            <button onClick={handleSave} >
              Sauvegarder
            </button>
          </div>
        
  );
}

export default SetInfoPersoM
