import React , {useState} from 'react';
import "./Constante.css"

const Rapport = ({ patientId, consultationId}) => {
  const [formData, setFormData] = useState({
                  rapport:'',
              });
      
          const handleChange = (e) => {
              const { name, value } = e.target;
          
              setFormData(prevState => ({
                  ...prevState,
                  [name]: value 
                }));
          };

          const handleSubmit  = async (e) => {
            e.preventDefault();
    
            if (!formData.rapport.trim()) {
                alert("Veuillez vérifier vos informations avant de confirmer.");
                return;
            }
        
            try {
              const response = await fetch("http://localhost:5000/saveRapport", {
                method: "POST",
                headers: {
                  "Content-Type": "application/json",
                },
                body: JSON.stringify({
                  consultation_id: consultationId,
                  patient_id: patientId,
                  medecin_id: sessionStorage.getItem("profile_id"),
                  rapport: formData.rapport,
                }),
              });
        
              const data = await response.json();
              if (response.ok) {
                alert("Rapport enregistré avec succès !");
                setFormData({ rapport: "" });
              } else {
                alert(data.message);
              }
            } catch (error) {
              console.error("Erreur lors de l'envoi du rapport:", error);
              alert("Une erreur est survenue, veuillez réessayer.");
            }
          };

  return (
    <div className="container" >
      <div className='content-b' style={{marginLeft:"1px"}}>
      <label className="select">
            <span className="label"></span>
            <div style={{display:"flex",marginLeft:"20px",marginTop:"10px"}}>
                <textarea
                style={{
                    
                    maxWidth:"550px",
                    minWidth:"550px",
                    maxHeight:"250px",
                    minHeight:"250px",
                    height: "100px",
                    whiteSpace: "normal", 
                    overflowWrap: "break-word", 
                }}
                placeholder="rapport"
                name="rapport"
                value={formData.rapport}
                onChange={handleChange}
                required
                
                ></textarea>
            </div>
        </label>
        <div className='save'>
            <button
              style={{ width:"100px" ,marginTop: "10px", padding: "10px", backgroundColor: "#0099B2", borderRadius: "8px", border: "none", cursor: "pointer" }}
              onClick={handleSubmit}
            >
              <h3>Enregistrer</h3>
            </button>
        </div>
        </div>
    </div>
  );
};

export default Rapport;
