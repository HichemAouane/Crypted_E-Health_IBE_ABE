import React, { useState } from 'react';
import "./Ordonnance.css";

const OrdonnanceV = () => {
 const [formData, setFormData] = useState({
         patient_id: '',
         medecin_id: '',
         hopital: '',
         date: new Date().toDateString(),
         medicament: [],
         forme: [],
         dosage: [],
         posologie: [],
         momment: [],
         duree: [],
         description: [],
         subtituable: [],
     });
   
     const handleChange = (e) => {
       const { name, value } = e.target;
       setFormData(prevState => ({
         ...prevState,
         [name]: value,
       }));
     };
   
     const handleAddMedocs = () => {
       setFormData(prevState => ({
         ...prevState,
             medicament: [...prevState.medicament, "",],
             forme: [...prevState.forme, "",],
             dosage: [...prevState.dosage, "",],
             posologie: [...prevState.posologie, "",],
             momment: [...prevState.momment, "",],
             duree: [...prevState.duree, "",],
             description: [...prevState.description, "",],
             subtituable: [...prevState.subtituable, "",]
       }));
     };
   
     const handleMedocChange = (index, field, value) => {
       setFormData(prevState => ({
         ...prevState,
         [field]: prevState[field].map((item, i) => 
             i === index ? value : item
         )
       }));
     };
   
     const handleDeleteMedoc = (index) => {
       setFormData(prevState => ({
         ...prevState,
         medicament: prevState.medicament.filter((_, i) => i !== index),
         forme: prevState.forme.filter((_, i) => i !== index),
         dosage: prevState.dosage.filter((_, i) => i !== index),
         posologie: prevState.posologie.filter((_, i) => i !== index),
         momment: prevState.momment.filter((_, i) => i !== index),
         duree: prevState.duree.filter((_, i) => i !== index),
         description: prevState.description.filter((_, i) => i !== index),
         subtituable:prevState.subtituable.filter((_, i) => i !== index)
       }));
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
         <div className='content-o-g'>
           <div className='content-o-i'>
             <label>
               <span><h4 className='lab'>Choisir l'Hopital/Clinique</h4></span>
               <select
                 style={{ padding: "6px 0", width: "88%", marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}
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
               <span ><h4 className='lab'>Date</h4></span>
               <input
                 style={{ padding: "6px 0", width: "85%", marginLeft: "25px", marginTop: "10px", marginBottom: "10px" }}
                 name='date'
                 placeholder='Date'
                 value={formData.date}
                 onChange={handleChange}
                 disabled
               />
             </label>

           </div>
           
           <button
             type="button"
             className='btn-add-medoc'
             onClick={handleAddMedocs}
           >
             ➕
           </button>
   
           {formData.medicament.map((Medoc, index) => (
             <div key={index} className='content-o-i'>
               <div className='content-o'>
               <label>
                 <span><h4>Médicament</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%",  marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}
                   type='text'
                   placeholder='Inserer le nom commercial du medicaments ou DCI'
                   value={Medoc}
                   onChange={(e) => handleMedocChange(index, 'medicament', e.target.value)}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Forme Galénique</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%",  marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}
                   type='text'
                   placeholder='ex: pommade , comprimés ....'
                   value={formData.forme[index] || ''}
                   onChange={(e) => handleMedocChange(index, 'forme', e.target.value)}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Dosage</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%",  marginLeft: "20px", marginTop: "10px", marginBottom: "10px" }}
                   type='text'
                   placeholder='ex: 500mg'
                   value={formData.dosage[index] || ''}
                   onChange={(e) => handleMedocChange(index, 'dosage', e.target.value)}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Posologie</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%",  marginLeft: "20px", marginTop: "10px", marginBottom: "30px" }}
                   type='text'
                   placeholder='ex: 1 comprimé 2 fois/jour'
                   value={formData.posologie[index] || ''}
                   onChange={(e) => handleMedocChange(index, 'posologie', e.target.value)}
                   required
                 />
               </label>
               </div>
   
               <div className='content-o'>
               <label>
                 <span><h4 >Momment</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%",  marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}
                   type='text'
                   placeholder='ex: Matin/Soir avant/apres repas a jeun'
                   value={formData.momment[index] || ''}
                   onChange={(e) => handleMedocChange(index, 'momment', e.target.value)}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Durée</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%",  marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}
                   type='text'
                   placeholder='ex: 5 jours'
                   value={formData.duree[index] || ''}
                   onChange={(e) => handleMedocChange(index, 'duree', e.target.value)}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Description</h4></span>
                 <input
                   style={{ padding: "6px 0", width: "90%",  marginLeft: "30px", marginTop: "10px", marginBottom: "10px" }}
                   type='text'
                   placeholder='ex: A ne pas prendre avec un autre medicaments...'
                   value={formData.description[index] || ''}
                   onChange={(e) => handleMedocChange(index, 'description', e.target.value)}
                   required
                 />
               </label>
   
               <label>
                 <span><h4>Subtituable</h4></span>
                 <select
                   style={{ padding: "6px 0", width: "90%", marginLeft: "30px", marginTop: "10px", marginBottom: "30px" }}
                   type='text'
                   value={formData.subtituable[index] || ''}
                   onChange={(e) => handleMedocChange(index, 'subtituable', e.target.value)}
                   required
                 >
                   <option value="Non">Non</option>
                   <option value="Oui">Oui</option>
                 </select>
               </label>
               </div>
   
               <button
                 type="button"
                 onClick={() => handleDeleteMedoc(index)}
                 style={{ width: "1px", marginRight: "15px", marginBottom: "10px",cursor: "pointer" }}
               >
                 🗑️
               </button>
             </div>
           ))}
   
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

export default OrdonnanceV;