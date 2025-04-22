import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import "./Hist.css";

const Infomed = ({patientId}) => {
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
            poids: data.poids || { valeur: "", unitpoids: "Kg" },
            taille: data.taille || { valeur: "", unittaille: "cm" },
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

  return (
    <div className='content-infoP' style={{borderRadius:"7px"}}>
      <div style={{ display: "flex" }}>
        <div>
          <p><strong>Type de Diabète:</strong> {user.diabetesType || "N/A"}</p>
          <p><strong>Poids:</strong> {user.poids?.valeur || "N/A"} {user.poids?.unitpoids || ""}</p>
          <p><strong>Taille:</strong> {user.taille?.valeur || "N/A"} {user.taille?.unittaille || ""}</p>
        </div>
      </div>
    </div>
  );
};

export default Infomed;
