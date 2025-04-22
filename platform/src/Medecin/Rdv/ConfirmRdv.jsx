import React ,{useState} from 'react'

const ConfirmRdv = ({ rdv, selectedDate }) => {

    const [formData, setFormData] = useState({
        _id: rdv._id || '',
        daterdv: selectedDate ? selectedDate : '',
        heurerdv: '',
        hopitalrdv: '',
        TypeDeRdv: rdv.TypeDeRdv || '',
        TypeDeConsultation: rdv.TypeDeConsultation || '',
        Motif: rdv.Motif || '',
    });

    
            
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData(prevState => ({
            ...prevState,
            [name]: value 
            }));
    };


    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.daterdv) {
            alert("Veuillez sélectionner une date !");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/randez-vous-recep/${rdv._id?.$oid}/accept`, {
                method: "PUT",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ 
                    statut: "accepté",
                    chosenDates: formData.daterdv,
                    heurerdv: formData.heurerdv,
                    hopitalrdv: formData.hopitalrdv,
                }),
            });

            if (response.ok) {
                alert("Rendez-vous accepté !");
            } else {
                alert("Erreur lors de la confirmation.");
            }
        } catch (error) {
            console.error("Erreur lors de l'acceptation du rendez-vous :", error);
        }
    };

  return (
    <div>
        <form onSubmit={handleSubmit}>
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
                <span className="label">
                    <h4>Choisir Un Horraire</h4></span>
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
                <span className="label"><h4>Choisir Un Hopital/Clinique</h4></span>
                    <select style={{padding:"6px 0",width:"90%",marginLeft:"20px",marginTop:"10px"}}
                        name='hopitalrdv'
                        value={formData.hopitalrdv}
                        onChange={handleChange}
                        required
                        >
                            <option value="">Sélectionnez</option>

                            <option value="Hopital El Ketar">Hopital El Ketar</option>

                            <option value="Clinique Benoumar">Clinique Benoumar</option>
                    </select>
            </label>

            <br></br>

        
            <button type="submit"
            style={{marginTop:"10px" ,padding:"10px",backgroundColor:"#0099B2" , borderRadius: "8px" ,
            boxShadow: "3px 3px 7px white",border: "none",cursor: "pointer"}}>
                <h3>Confirmer</h3>
            </button>
        </form>
    </div>
  )
}

export default ConfirmRdv