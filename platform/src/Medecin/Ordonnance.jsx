import React, { useRef, useState } from "react";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "../Patient/ord-css.css";

const Ordonnance = ({ patientId, consultationId }) => {
  const [inputs, setInputs] = useState([""]);
  const [signature, setSignature] = useState(null);
  const [stamp, setStamp] = useState(null);
  const paperRef = useRef();
  const [formData, setFormData] = useState({
    hopital: "",
    hopitalar:"",
    wilaya:"",
    docteur:"",
    patient:"",
    age:"",
    dateord: new Date().toISOString().split("T")[0],
    medicament: [],
    forme: [],
    dosage: [],
    posologie: [],
    momment: [],
    duree: [],
    description: [],
    subtituable: [],
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData|| !formData.hopital) {
        alert("Veuillez remplir tous les champs requis.");
        return;
    }

    try {
        const response = await fetch("http://localhost:5000/saveOrdonnance", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                consultation_id: consultationId,
                patient_id: patientId,
                medecin_id: sessionStorage.getItem("profile_id"),
                ord: formData,
            }),
        });

        const data = await response.json();
        if (response.ok) {
            alert("Ordonnance enregistrée avec succès!");
        } else {
            alert(`Erreur: ${data.message}`);
        }
    } catch (error) {
        console.error("Erreur lors de l'enregistrement:", error);
        alert("Une erreur est survenue.");
    }
};

  const handleFileChange = (event, type) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        if (type === "signature") {
          setSignature(reader.result);
        } else if (type === "stamp") {
          setStamp(reader.result);
        }
      };
      reader.readAsDataURL(file);
    }
  };

  const generatePDF = async () => {
    const input = paperRef.current;
    const buttons = input.querySelectorAll("button, input[type='file']");
    buttons.forEach((button) => button.classList.add("hidden"));
  
    await new Promise((resolve) => setTimeout(resolve, 200));
  
   
    const medChunks = [];
    for (let i = 0; i < inputs.length; i += 2) {
      medChunks.push(inputs.slice(i, i + 2));
    }
  
    for (let i = 0; i < medChunks.length; i++) {
      
      setInputs(medChunks[i]);
      await new Promise((resolve) => setTimeout(resolve, 300)); 
  
      const canvas = await html2canvas(input, {
        scale: 3,
        useCORS: true,
      });
      const imgData = canvas.toDataURL("image/png");
      const pdf = new jsPDF({
        orientation: "portrait",
        unit: "mm",
        format: "a4",
      });
  
      const imgWidth = 210;
      const imgHeight = (canvas.height * imgWidth) / canvas.width;
  
      pdf.addImage(imgData, "PNG", 0, 0, imgWidth, imgHeight);
      pdf.save(`Ordonnance_${i + 1}.pdf`);
    }
  
  
    setInputs(inputs);
    buttons.forEach((button) => button.classList.remove("hidden"));
  };

  const addInput = () => {
    setInputs([...inputs, ""]);
    setFormData((prev) => ({
      ...prev,
      medicament: [...prev.medicament, ""],
      forme: [...prev.forme, ""],
      dosage: [...prev.dosage, ""],
      posologie: [...prev.posologie, ""],
      momment: [...prev.momment, ""],
      duree: [...prev.duree, ""],
      description: [...prev.description, ""],
      subtituable: [...prev.subtituable, ""],
    }));
  };

  const removeInput = (index) => {
    setInputs((prevInputs) => prevInputs.filter((_, i) => i !== index));

  
    setFormData((prev) => {
      const updatedFormData = {};
      Object.keys(prev).forEach((key) => {
        if (Array.isArray(prev[key])) {
          updatedFormData[key] = prev[key].filter((_, i) => i !== index);
        } else {
          updatedFormData[key] = prev[key];
        }
      });
      return updatedFormData;
    });
  };

  const handleInputChange = (field,index, event) => {
    const newValue = event.target.value;
    const newInputs = [...inputs];
    newInputs[index] = newValue;
    setInputs(newInputs);

    setFormData((prev) => {
      const updatedField = [...prev[field]];
      updatedField[index] = newValue;
      return { ...prev, [field]: updatedField };
    });
  };

  return (
    <div>
      <div
        ref={paperRef}
        style={{
          marginTop:"120px",
          marginLeft:"-50px", 
          width: "690px",
          padding: "20px",
          background: "white",
          border: "1px solid black",
        }}
      >
        <div className="uppercontainer">
            <input
            type="text"
            onChange={(e) => setFormData({ ...formData, hopitalar: e.target.value })}
            placeholder="L'hopital ou Clinique(Arabe)"
            className="Ordonnance-remplir-header"
            />
            <input
            type="text"
            onChange={(e) => setFormData({ ...formData, hopital: e.target.value })}
            placeholder="L'hopital ou Clinique(Francais)"
            className="Ordonnance-remplir-header"
            />
        </div>
        
        <hr style={{ height: "3px", backgroundColor: "black" }}></hr>

        
        <div
          style={{ display: "flex", flexDirection: "column", alignContent: "center",height:"150px",marginTop:"10px"}}
        >
          <div>
            <input
                type="text"
                onChange={(e) => setFormData({ ...formData, wilaya: e.target.value })}
                className="Ordonnance-remplir-wilaya"
                placeholder="Wilaya"
            />
            <span className="text-random">
                <b>,le</b>
            </span>
            <input 
              type="date" 
              onChange={(e) => setFormData({ ...formData, dateord: e.target.value })}
              className="Ordonnance-remplir-date"
              ></input>
          </div>
          <div>
            <span className="text-random">
              <b>Délivrée par le docteur :</b>
            </span>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, docteur: e.target.value })}
              placeholder="Remplir Docteur"
              className="Ordonnance-remplir-docteur"
            ></input>
          </div>
          <div>
            <span className="text-random">
              <b>A M. :</b>
            </span>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, patient: e.target.value })}
              placeholder="Remplir Patient"
              className="Ordonnance-remplir-patient"
            ></input>
          </div>
          <div>
            <span className="text-random">
              <b>Age:</b>
            </span>
            <input
              type="text"
              onChange={(e) => setFormData({ ...formData, age: e.target.value })}
              placeholder="Remplir Age"
              className="Ordonnance-remplir-patient"
            ></input>
          </div>
        </div>
        <h2 style={{ textAlign: "center", marginBottom: "15px" }}>
          ORDONNANCE
        </h2>
        <div>
          {inputs.map((input, index) => (
            <div key={index} style={{ display: "flex",flexDirection:"column",rowGap:"10px", alignItems: "center",marginBottom:"10px", border:"1px solid black"}}>
              <div>
                <span className="text-random">
                    <b>Médicament :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("medicament", index, e)}
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <div>
                <span className="text-random">
                    <b>Forme Galénique :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("forme", index, e)}
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <div>
                <span className="text-random">
                    <b>Dosage :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("dosage", index, e)}                    
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <div>
                <span className="text-random">
                    <b>Posologie :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("posologie", index, e)}
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <div>
                <span className="text-random">
                    <b>Momment :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("momment", index, e)}
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <div>
                <span className="text-random">
                    <b>Durée :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("duree", index, e)}
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <div>
                <span className="text-random">
                    <b>Description :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("description", index, e)}
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <div>
                <span className="text-random">
                    <b>Subtituable :</b>
                </span>
              
                <input
                    type="text"
                    onChange={(e) => handleInputChange("subtituable", index, e)}
                    placeholder="..................."
                    className="Ordonnance-remplir-medicament"
                />
              </div>
              <button onClick={() => removeInput(index)} style={{ marginLeft: "10px" ,width:"100px"}}>Supprimer</button>
            </div>
          ))}
          <button onClick={addInput}>Ajouter</button>
        </div>
        <h3>Signature et Cachet</h3>
        <div style={{display:"flex", marginTop: "20px", textAlign: "center" }}>
            
            <div>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "stamp")} />
            {stamp && <img src={stamp} alt="Cachet" style={{ maxWidth: "100px", marginTop: "-20px" }} />}
            </div>
            <div>
            <input type="file" accept="image/*" onChange={(e) => handleFileChange(e, "signature")} />
            {signature && <img src={signature} alt="Signature" style={{ maxWidth: "100px", marginTop: "-20px" }} />}
            </div>
        </div>
      </div>
      <div style={{display:"flex",columnGap:"50px",justifyContent:"center",margin:"10px 50px"}}>
        <button className="download-btn" onClick={handleSubmit}>
          Envoiyer a Patient
        </button>
        
        <button className="download-btn" onClick={generatePDF}>
        Telecharger comme PDF
        </button>
      </div>
    </div>
  );
};

export default Ordonnance;