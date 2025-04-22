import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const SetInfoMed = () => {
  const [user, setUser] = useState({
    diabetesType: '',
    poids: {
      valeur: '',
      unitpoids: 'Kg'
    },
    taille: {
      valeur: '',
      unittaille: 'cm'
    },
  });

  const [loading, setLoading] = useState(true);
  const Navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.startsWith("taille") || name.startsWith("poids")) {
      const [field, subField] = name.split(".");
      setUser(prevState => ({
        ...prevState,
        [field]: {
          ...prevState[field],
          [subField]: value,
        },
      }));
    } else {
      setUser(prevState => ({
        ...prevState,
        [name]: value
      }));
    }
  };

  useEffect(() => {
    const fetchUserData = async () => {
      const profileId = sessionStorage.getItem("profile_id");
      if (!profileId) return;

      try {
        const response = await fetch(`http://localhost:5000/get-user-info?profile_id=${profileId}`);
        const data = await response.json();

        if (response.ok) {
          console.log("Fetched user data:", data);

          setUser({
            diabetesType: data.diabetesType || "",
            poids: {
              value: data.poids?.valeur || "",
              unitpoids: data.poids?.unitpoids || "Kg"
            },
            taille: {
              value: data.taille?.valeur || "",
              unittaille: data.taille?.unittaille || "cm"
            }
          });

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
    return <p>Chargement...</p>;
  }

  const handleSave = async () => {
    const profileId = sessionStorage.getItem("profile_id");
    if (!profileId) return alert("Profile ID is missing!");

    const updatedData = { 
      profile_id: profileId, 
      diabetesType: user.diabetesType,
      poids: user.poids,
      taille: user.taille
    };

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
      

    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <div className='content-infoP' style={{ borderRadius: "7px" }}>
      <p style={{ width: "95px", fontWeight: "600", height: "19px", marginBottom: "-10px" }}>Taille</p>
      <div style={{ display: "flex", columnGap: "20px", marginLeft: "20px" }}>
        <input
          type='text'
          name='taille.value'
          placeholder="La taille"
          value={user.taille?.value || ""}
          onChange={handleChange}
          style={{ width: "450px" }}
        />
        <select
          name='taille.unittaille'
          value={user.taille?.unittaille || "cm"}
          onChange={handleChange}
          style={{ width: "80px", marginTop: "21px" }}
        >
          <option value="cm">cm</option>
          <option value="Ft">Ft</option>
        </select>
      </div>

      <p style={{ width: "100px", fontWeight: "600", height: "19px", marginBottom: "-10px" }}>Poids</p>
      <div style={{ display: "flex", columnGap: "20px", marginLeft: "20px" }}>
        <input
          type='text'
          name='poids.value'
          placeholder="Poids"
          value={user.poids?.value || ""}
          onChange={handleChange}
          style={{ width: "450px" }}
        />
        <select
          name='poids.unitpoids'
          value={user.poids?.unitpoids || "Kg"}
          onChange={handleChange}
          style={{ width: "80px", marginTop: "21px" }}
        >
          <option value="Kg">Kg</option>
          <option value="Lbs">Lbs</option>
        </select>
      </div>

      <p style={{  fontWeight: "600", height: "19px", marginLeft:"-210px"}}> Type de Diabète </p>
      <input
        type="text"
        name="diabetesType"
        value={user.diabetesType || "N/A"}
        onChange={handleChange}
      />

      <button onClick={handleSave}>Sauvegarder</button>
    </div>
  );
};

export default SetInfoMed;
