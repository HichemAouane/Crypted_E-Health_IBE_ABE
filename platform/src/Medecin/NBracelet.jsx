import { formToJSON } from 'axios'
import React ,{useState} from 'react'

const NBracelet = () => {

    const [formData, setFormData] = useState({
             patient_id: '',
             medecin_id: '',
             hopital: '',
             date: new Date().toDateString(),
             glicimiec:'',
             hemoglobine:'',
             pression:'',
             poids:{
                value:'',
                unitwight:'Kg'},
             tourtaille:{
                value:'',
                unitwight:'cm'},
             temperature:'',
             cholesterol:'',
             creatinine:'',
             proteinurie:'',
             bilan:'',

         });


          const handleChange = (e) => {
            const { name, value } = e.target;
            
            if (name.startsWith("poids") || name.startsWith("tourtaille")) {
                const [field, subField] = name.split(".");
                let formattedValue = value;
                    
                if (subField === "value") {
                    if (field === "poids") {
                        // Apply height formatting
                        if (formData.hight.unithight === "cm") {
                            formattedValue = value.replace(/[^0-9.]/g, "").slice(0, 6); // XXX.XX
                            if (!/^\d{0,3}(\.\d{0,2})?$/.test(formattedValue)) return;
                        } else if (formData.hight.unithight === "pouce") {
                            formattedValue = value.replace(/[^0-9.]/g, "").slice(0, 4); // X.XX
                            if (!/^\d{0,1}(\.\d{0,2})?$/.test(formattedValue)) return;
                        }
                    } else if (field === "tourtaille") {
                        // Apply weight formatting
                        if (formData.wight.unitwight === "Kg") {
                            formattedValue = value.replace(/[^0-9.]/g, "").slice(0, 7); // XXX.XXX
                            if (!/^\d{0,3}(\.\d{0,3})?$/.test(formattedValue)) return;
                        } else if (formData.wight.unitwight === "Lbs") {
                            formattedValue = value.replace(/[^0-9]/g, "").slice(0, 3); // XXX (integer only)
                            if (!/^\d{0,3}$/.test(formattedValue)) return;
                        }
                    }
                }
                setFormData(prevState => ({
                    ...prevState,
                    [field]: {
                        ...prevState[field],
                        [subField]: formattedValue,
                    },
                }));
            } else {
                setFormData(prevState => ({
                    ...prevState,
                    [name]: value
                }));
            }
        };

          const handleSubmit  = async (e) => {
            e.preventDefault();
    
            if (!formData.verified) {
                alert("Veuillez vérifier vos informations avant de confirmer.");
                return;
            }
        
        };


  return (
    <div>
        <div className='content-b'>
           <div className='content-o-i'>
             <label>
               <span><h4 className='label'>Choisir l'Hopital/Clinique</h4></span>
               <select
                 style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}
                 name='hopital'
                 placeholder='Hopital'
                 value={formData.hopital}
                 onChange={handleChange}
                 required
               >
                 <option value="">Sélectionnez un hôpital</option>
                 <option value="Hopital A">Hôpital A</option>
                 <option value="Hopital B">Hôpital B</option>
               </select>
             </label>
   
             <label>
               <span ><h4 className='label'>Date</h4></span>
               <input
                 style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}
                 name='date'
                 placeholder='Date'
                 value={formData.date}
                 onChange={handleChange}
                 required
               />
             </label>
           </div>
   
             <div className='content-o-i'>
               <div className='content-o'>
                <h2>Signes Vitaux et Mesures Générales</h2>
               <label>
                 <span><h4>Glycémie capillaire (taux de sucre dans le sang)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px" }}
                   type='text'
                   name='glicimiec'
                   placeholder='ex: 1.2 g/l'
                   value={formData.glicimiec}
                   onChange={handleChange}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Hémoglobine glyquée (HbA1c) (contrôle de la glycémie sur 2-3 mois)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px" }}
                   type='text'
                   name='hemoglobine'
                   placeholder='ex: 20 g/l'
                   value={formData.hemoglobine}
                   onChange={handleChange}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Pression artérielle (pour surveiller l’hypertension)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px" }}
                   type='text'
                   name='pression'
                   placeholder='ex: 12 9 '
                   value={formData.pression}
                   onChange={handleChange}
                   required
                 />
               </label>
   
               <label >
                 <span><h4>Poids et IMC (suivi de l’obésité ou perte de poids involontaire)</h4></span>
                 <div style={{display:"flex",columnGap:"10px",marginLeft:"20px",marginBottom: "20px"}}>
                   <input
                    type='text'
                    name='poids.value'
                    placeholder="Le poids"
                    value={formData.poids.value}
                    onChange={handleChange} 
                    style={{width:"450px",padding: "6px 0"}}   
                    required                                  
                />                                   
                <select                     
                    name='poids.unithight'
                    value={formData.poids.unitwight}
                    onChange={handleChange}
                    style={{width:"60px"}}
                >
                    <option value="Kg">Kg</option>
                    <option value="Lbs">Lbs</option>

                </select>
                </div>
               </label>

               <label>
                 <span><h4>Tour de taille (indicateur de risque cardiovasculaire)</h4></span>
                 <div style={{display:"flex",columnGap:"10px",marginLeft:"20px",marginBottom: "20px"}}>
                   <input
                    type='text'
                    name='tourtaille.value'
                    placeholder="Le Tour de Taille"
                    value={formData.tourtaille.value}
                    onChange={handleChange} 
                    style={{width:"450px",padding: "6px 0"}}  
                    required                                   
                />                                   
                <select                     
                    name='tourtaille.unithight'
                    value={formData.tourtaille.unitwight}
                    onChange={handleChange}
                    style={{width:"60px"}}

                >
                    <option value="Cm">Cm</option>
                    <option value="Pouce">Pouce</option>

                </select>
                </div>
               </label>

               <label>
                 <span><h4>Température corporelle (surtout si infection suspectée)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px"}}
                   type='text'
                   name='temperature'
                   placeholder='ex: 37°c'
                   value={formData.temperature}
                   onChange={handleChange}
                   required
                 />
               </label>
               </div>
             </div>

             <div className='content-o-i'>
               <div className='content-o'>
                <h2>Examens Biologique et metabolique</h2>
               <label>
                 <span><h4> Cholestérol et triglycérides (risque cardiovasculaire)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px" }}
                   type='text'
                   name='cholesterol'
                   placeholder=''
                   value={formData.cholesterol}
                   onChange={handleChange}
                   required

                 />
               </label>
   
               <label>
                 <span><h4>Créatinine et DFG (Débit de Filtration Glomérulaire) (évaluation de la fonction rénale)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px" }}
                   type='text'
                   name='creatinine'
                   
                   value={formData.creatinine}
                   onChange={handleChange}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Protéinurie ou microalbuminurie (signes précoces de néphropathie diabétique)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px" }}
                   type='text'
                   name='proteinurie'
                   value={formData.proteinurie}
                   onChange={handleChange}
                   required

                 />
               </label>
   
               <label>
                 <span><h4>Bilan hépatique (surtout si suspicion de stéatose hépatique)</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%", marginLeft: "20px", marginTop: "10px", marginBottom: "20px" }}
                   type='text'
                   name='bilan'
                   
                   value={formData.bilan}
                   onChange={handleChange}
                   required
                 />
               </label>
               </div>
             </div>   
   
   
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
  )
}

export default NBracelet