import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { jsPDF } from "jspdf";
import html2canvas from "html2canvas";
import "./ord-css.css";

const HTMLtoPDF = () => {
    const location = useLocation();
    const ord_info = location.state?.ord_info || {};
    console.log("sasasa",ord_info)

  const [inputs, setInputs] = useState(ord_info.medicaments || []);
  const paperRef = useRef();
  


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



  return (
    <div>
      <div
        ref={paperRef}
        style={{
          marginLeft: "150px",
          minHeight: "800px",
          height:"100%",
          width: "700px",
          padding: "20px",
          background: "white",
          border: "1px solid black",
        }}
      >
        <div className="uppercontainer">
          
            {ord_info.hopitalar && (
              <input
                type="text"
                value={ord_info.hopitalar}
                className="Ordonnance-remplir-header"
              />
            )}
            <input
            type="text"
            name="hospitalFr"
            value={ord_info.hopital}
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
                name="wilaya"
                value={ord_info.wilaya}
                className="Ordonnance-remplir-wilaya"
                placeholder="Wilaya"
            />
            <span className="text-random">
                <b>,le</b>
            </span>
            <input 
              type="text"
              name="date"
              value={ord_info.dateord}

              className="Ordonnance-remplir-date"></input>
          </div>
          <div>
            <span className="text-random">
              <b>Délivrée par le docteur :</b>
            </span>
            <input
              type="text"
              name="doctor"
              value={ord_info.docteur}

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
              name="patient"
              value={ord_info.patient}
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
              name="age"
              value={ord_info.age}
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
    <div key={index} style={{ display: "flex", flexDirection: "column", rowGap: "10px", alignItems: "center", marginBottom: "10px", border: "1px solid black" }}>
      
      <div>
        <span className="text-random"><b>Médicament :</b></span>
        <input
          type="text"
          value={input.medicament}
          placeholder="Nom du médicament"
          className="Ordonnance-remplir-medicament"
        />
      </div>

      <div>
        <span className="text-random"><b>Forme Galénique :</b></span>
        <input
          type="text"
          value={input.forme}
          placeholder="Forme"
          className="Ordonnance-remplir-medicament"
        />
      </div>

      <div>
        <span className="text-random"><b>Dosage :</b></span>
        <input
          type="text"
          value={input.dosage}

          placeholder="Dosage"
          className="Ordonnance-remplir-medicament"
        />
      </div>

      <div>
        <span className="text-random"><b>Posologie :</b></span>
        <input
          type="text"
          value={input.posologie}

          placeholder="Posologie"
          className="Ordonnance-remplir-medicament"
        />
      </div>

      <div>
        <span className="text-random"><b>Momment :</b></span>
        <input
          type="text"
          value={input.momment}

          placeholder="Moment de prise"
          className="Ordonnance-remplir-medicament"
        />
      </div>

      <div>
        <span className="text-random"><b>Durée :</b></span>
        <input
          type="text"
          value={input.duree}

          placeholder="Durée du traitement"
          className="Ordonnance-remplir-medicament"
        />
      </div>

      <div>
        <span className="text-random"><b>Description :</b></span>
        <input
          type="text"
          value={input.description}

          placeholder="Description"
          className="Ordonnance-remplir-medicament"
        />
      </div>

      <div>
        <span className="text-random"><b>Substituable :</b></span>
        <input
          type="text"
          value={input.subtituable}

          placeholder="Oui / Non"
          className="Ordonnance-remplir-medicament"
        />
      </div>

    </div>
  ))}
        </div>
        <h3>Signature et Cachet</h3>
        <div style={{display:"flex", marginTop: "20px", textAlign: "center" }}>
            
            
        </div>
      </div>
      <div style={{display:"flex",columnGap:"50px",justifyContent:"center",margin:"10px 50px"}}>       
        <button className="download-btn" onClick={generatePDF}>
        Telecharger comme PDF
        </button>
      </div>
    </div>
  );
};

export default HTMLtoPDF;