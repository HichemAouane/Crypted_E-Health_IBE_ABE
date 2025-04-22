import React, { useState, useEffect  }from 'react'
import NavbarProfilM from '../Commun/Navigation/NavbarProfilM'
import { useNavigate } from 'react-router-dom';
import SidebarM from "../Commun/Navigation/SidebarM";
import './Profile.css'

const SetInfoProM = () => {
  const [user, setUser] = useState({
    photosignature:"",
    photocachet:"",
    specialite: '',
    experience:'',
    Hopitalprincipale:'',
    Willayaprincipale:'',
    Communeprincipale:'',
    Hôpital: [],
    Willaya:[],
    Commune:[],
  });

  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();
  const [newPhoto, setNewPhoto] = useState(null);
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
            photosignature: data.photosignature || prevUser.photosignature, 
            experience: data.experience || "",
            specialite: data.specialite || "",

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
                        typedecompte: accountType,
                    }),
                });

                const data = await response.json();
                if (!response.ok) {
                    alert("Error updating photo: " + data.error);
                    return;
                }

                alert("Profile photo updated!");
                setUser((prev) => ({ ...prev, photosignature: newPhotoUrl }));   

            } catch (error) {
                console.error("Error:", error);
                alert("An error occurred while updating the profile photo.");
            }
        };

        reader.readAsDataURL(file);
    }
};

const handleAddHospitales = () => {
    setUser(prevState => ({
      ...prevState,
      Hôpital: [...prevState.Hôpital, "",],
      Commune: [...prevState.Commune, "",],
      Willaya: [...prevState.Willaya, "",]
    }));
  };
  

  const handleHospitalChange = (index, field, value) => {
    setUser(prevState => ({
        ...prevState,
        [field]: prevState[field].map((item, i) => 
            i === index ? value : item
        )
    }));
};

const handleDeleteHospitales = (index) => {
    setUser(prevState => ({
        ...prevState,
        Hôpital: prevState.Hôpital.filter((_, i) => i !== index),
        Willaya: prevState.Willaya.filter((_, i) => i !== index),
        Commune: prevState.Commune.filter((_, i) => i !== index)
    }));
};


const handleSave = async () => {
  const profileId = sessionStorage.getItem("profile_id");
  if (!profileId) return alert("Profile ID is missing!");

  const updatedData = { profile_id: profileId };
  if (user.specialite) updatedData.specialite = user.specialite;

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
          localStorage.clear();
          Navigate("/choice"); 
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

            <div style={{display:"flex",alignItems:"center"}}>

              <button style={{width:"200px", padding:"15px"}} onClick={() => document.getElementById("fileInput").click()}>
                Changer le cachet
              </button>
              <img className='acc-profile-img-changer' src={user.photocachet} alt="Profile" />
              
            </div>

            <input type="file" id="fileInput" className="hidden" onChange={handlePhotoChange} style={{ display: "none" }} />

            <div style={{display:"flex",alignItems:"center"}}>

              <button style={{width:"200px", padding:"15px"}} onClick={() => document.getElementById("fileInput").click()}>
                Changer la signature
              </button>
              <img className='acc-profile-img-changer' src={user.photosignature} alt="Profile" />
              
            </div>

            <input
              type="text"
              name="speciality"
              value={user.specialite}
              onChange={handleChange}
              disabled
              
            />
            
            <input
              type="text"
              name="experience"
              value={user.experience}
              onChange={handleChange}
              disabled
              
            />
            
            <div style={{ display: "flex",gap:"20px", alignItems: "center",   marginLeft:"7px" }}>
                    <div>
                        <p style={{width:"80px",fontWeight:"600"}}>Hopital/Clinique</p>
                        <select
                        name="Hopitalprincipale"
                        value={user.Hopitalprincipale} 
                        onChange={handleChange}
                        required
                    
                    >

                            <option value="">Hopital / Clinique </option>

                            <option value="Hopital El Ketar">Hopital El Ketar</option>

                            <option value="Clinique Benoumar">Clinique Benoumar</option>
                
                        </select>
                    </div>
                    
                    <div>
                        <p style={{width:"50px",fontWeight:"600"}}>Willaya</p>
                        {/* Sélecteur Willaya */}
                        <select
                        name="Willayaprincipale"
                        value={user.Willayaprincipale}
                        onChange={handleChange}
                        required
                        
                        >
                            <option value="">Willaya</option>
                    
                            <option value="Alger">Alger</option>

                            <option value="Adrar">Adrar</option>

                        </select>
                    </div>
                    
                    <div>
                        <p style={{width:"50px",fontWeight:"600"}}>Commune</p>
                        {/* Sélecteur Commune */}
                        <select
                            name="Communeprincipale"
                            value={user.Communeprincipale}
                            onChange={handleChange}
                            required
                        >
                            <option value="">Commune</option>
                                        
                            <option value="Lareb3a nath irathen">Lareb3a nath irathen</option>
                
                        </select>
                    </div>
                    

                    <buttonbtn type="button" style={{width:"1px", marginRight:"7px", marginLeft:"-8px",marginBottom:"10px",cursor:"pointer"}} onClick={handleAddHospitales} >➕</buttonbtn>
                </div>
    
                {user.Hôpital.map((hospital, index) => (
                <div  key={index} style={{ display: "flex",gap:"20px", alignItems: "center",  marginBottom: "5px", marginLeft:"7px" }}>
                    {/* Sélecteur Hôpital */}
                    <div>
                        <p style={{width:"80px",fontWeight:"600"}}>Hopital/Clinique</p>
                        <select
                        value={hospital}
                        onChange={(e) => handleHospitalChange(index, 'Hôpital', e.target.value)}
                        required
                        
                        >
                            <option value="">Hopital / Clinique</option>

                            <option value="Hopital El Ketar">Hopital El Ketar</option>

                            <option value="Clinique Benoumar">Clinique Benoumar</option>

                        </select>
                    </div>
                    
                    

                    <div>
                        <p style={{width:"50px",fontWeight:"600"}}>Willaya</p>
                        {/* Sélecteur Willaya */}
                        <select
                            value={user.Willaya[index] || ''}
                            onChange={(e) => handleHospitalChange(index, 'Willaya', e.target.value)}
                            required
                            
                        >
                            <option value="">Willaya</option>
                            
                            <option value="Alger">Alger</option>

                            <option value="Adrar">Adrar</option>

                        </select>
                    </div>
                    
                    

                    <div>
                        <p style={{width:"50px",fontWeight:"600"}}>Commune</p>
                        {/* Sélecteur Commune */}
                        <select
                            value={user.Commune[index] || ''}
                            onChange={(e) => handleHospitalChange(index, 'Commune', e.target.value)}
                            required
                            
                        >
                            <option value="">Commune</option>
                                        
                            <option value="Lareb3a nath irathen">Lareb3a nath irathen</option>
                
                        </select>
                    </div>
                    
                        <buttonbtn type="buttonbtn"  onClick={() => handleDeleteHospitales(index)}
                    style={{width:"1px", marginRight:"7px",marginBottom:"10px", marginLeft:"-8px",cursor:"pointer",}}>
                        🗑️</buttonbtn>
                        
                    </div>

                    
                
                ))}

                       

                    

            <button onClick={handleSave} >
              Sauvegarder
            </button>
          </div>
       

      
  );
}

export default SetInfoProM
