import React ,{useState} from 'react'

const SetRdv = ({ rdv }) => {

    const [formData, setFormData] = useState({
                    daterdv: '',
                    heurerdv: '',
                    hopitalrdv:'',               
    });
    const [message, setMessage] = useState('');
        
    const handleChange = (e) => {
        const { name, value } = e.target;
    
        setFormData(prevState => ({
            ...prevState,
            [name]: value 
            }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!rdv || !rdv._id) {
            setMessage("Aucun rendez-vous sélectionné.");
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/rendez-vous/${rdv._id}/update`, {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const data = await response.json();

            if (response.ok) {
                setMessage("Rendez-vous mis à jour avec succès !");
                alert(message)
            } else {
                setMessage(data.error || "Erreur lors de la mise à jour.");
                alert(message)
            }
        } catch (error) {
            setMessage("Erreur de connexion au serveur.");
            alert(message)
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
            <span className="label"><h4>Choisir Un Hopital/Clinique</h4></span>
                <select style={{padding:"6px 0",width:"90%",marginLeft:"20px",marginTop:"10px"}}
                    name='hopitalrdv'
                    value={formData.hopitalrdv}
                    onChange={handleChange}
                    required
                    >
                        <option value=""></option>

                        <option value="Hopital El Ketar">Hopital El Ketar</option>

                        <option value="Clinique Benoumar">Clinique Benoumar</option>
                </select>
        </label>

        <br></br>
        
        <button 
        type="submit"
        style={{marginTop:"10px" ,padding:"10px",backgroundColor:"#0099B2" , borderRadius: "8px" ,
        boxShadow: "3px 3px 7px white",border: "none",cursor: "pointer"}}
        >
            <h3>Enregistrer</h3></button>
            </form>
    </div>
  )
}

export default SetRdv