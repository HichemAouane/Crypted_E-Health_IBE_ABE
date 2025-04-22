import React, {useState}  from 'react'

const AddRdv = () => {

    const [formData, setFormData] = useState({
                id_acc:'',
                daterdv: '',
                heurerdv: '',
                TypeDeRdv: '',
                TypeDeConsultation: '',
                Motif: '',
                
            });
    
        const handleChange = (e) => {
            const { name, value } = e.target;
        
            setFormData(prevState => ({
                ...prevState,
                [name]: value 
              }));
        };

  return (
    <div >
        <label >
            <span ><h4>Choisir Une Date</h4></span>
                <input style={{padding:"6px 0",width:"90%",marginLeft:"20px",marginTop:"10px"}}
                    name='daterdv'
                    type='date'
                    placeholder='Date'
                    value={formData.daterdv}
                    onChange={handleChange}
                    required
                    >
                </input>
        </label>

        <br></br><br></br>

        <label className="select">
            <span className="label"><h4>Choisir Un Horraire</h4></span>
                <input style={{padding:"6px 0",width:"90%",marginLeft:"20px",marginTop:"10px"}}
                    name='heurerdv'
                    type='time'
                    value={formData.heurerdv}
                    onChange={handleChange}
                    required
                    >
                </input>
        </label>

        <br></br><br></br>

        <label className="select">
            <span className="label"><h4>Type De Rendez-Vous</h4></span>
                <select style={{padding:"7px 0",width:"90%",marginLeft:"20px",marginTop:"10px"}}
                    name="TypeDeRdv"
                    value={formData.TypeDeRdv}
                    onChange={handleChange}
                    required
                >
                    <option value=""></option>

                    <option value="Prémiere Consultation">
                    Prémiere Consultation
                    </option>

                    <option value="Suivie">
                        Suivie
                    </option>

                </select>
        </label>

        <br></br><br></br>

        <label className="select">
            <span className="label"><h4>Type de Consultation</h4></span>
            <select style={{padding:"7px 0",width:"90%",marginLeft:"20px",marginTop:"10px"}}
                name="TypeDeConsultation"
                value={formData.TypeDeConsultation}
                onChange={handleChange}
                required
            >
                <option value=""></option>

                <option value="Consultation en ligne (Vidéo)">
                Consultation en ligne (Vidéo)
                </option>

                <option value="Consultation Presentielle">
                Consultation Presentielle
                </option>

            </select>
        </label>

        <br></br><br></br>

        <label className="select">
            <span className="label"><h4>Motif du Rendez-Vous</h4></span>
            <div style={{display:"flex",marginLeft:"20px",marginTop:"10px"}}>
                <textarea
                style={{
                    
                    maxWidth:"450px",
                    minWidth:"450px",
                    maxHeight:"100px",
                    minHeight:"100px",
                    height: "100px",
                    whiteSpace: "normal", 
                    overflowWrap: "break-word", 
                }}
                placeholder="Motif"
                name="Motif"
                value={formData.Motif}
                onChange={handleChange}
                required
                
                ></textarea>
            </div>
        </label>

        <br></br>
        <button 
        style={{marginTop:"10px" ,padding:"10px",backgroundColor:"#0099B2" , borderRadius: "8px" ,
        boxShadow: "3px 3px 7px white",border: "none",cursor: "pointer"}}>
            <h3>Enregistrer</h3></button>
    </div>
  )
}

export default AddRdv