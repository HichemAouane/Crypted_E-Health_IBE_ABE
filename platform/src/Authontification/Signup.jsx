import React, {useState} from 'react';
import Navbar from '../Commun/Navigation/Navbar';
import Goback from '../Commun/Goback';


const Signuppat = ()  => {
    const [selected, setSelected] = useState("option1");
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        role:'Medecin',
        compte_actif: 'actif',
        date_creation: new Date(),
      });


    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSignup = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://127.0.0.1:5000/signupboth", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
      
            const data = await response.json();

            console.log(data)
            sessionStorage.setItem("user_id", data.user_id);
            sessionStorage.setItem("user_email",data.user_email);
            sessionStorage.setItem("typedecompte",formData.role)
            
            if (response.ok) {
                alert("Connexion réussie!");
                if(formData.role==="Patient"){window.location.href = "/patient"}
                else{window.location.href = "/Med"}
                
            } else {
                alert("Erreur: " + data.error);
            }
          } catch (error) {
            console.error("Error:", error);
            alert("Erreur de connexion au serveur.");
        }
    };


    return (
        <div>
            <Navbar />
            <Goback />
        <div className="auth-container" style={{marginTop:"100px",marginLeft:"400px"}}>
            <h2>Inscrivez Vous</h2>
            <div className='btnfixer'>
                <button
                    onClick={() => {
                        setSelected("option1"); document.getElementById("button2").style.backgroundColor = "gray";
                        document.getElementById("button1").style.backgroundColor = "rgb(39, 104, 224)"; setFormData({ ...formData, ["role"]: "Medecin" });
                        document.getElementById("Continuer-btn").style.backgroundColor = "rgb(39, 104, 224)";
                    }}
                    className={selected === "option1" ? "btn selected" : "btn"}
                    id='button1'
                    style={{margin:"0px",borderRadius:"20px"}}
                    value={"Medecin"}
                >
                    Medical Practitioner
                </button>
                <button
                    onClick={() => {setSelected("option2"); document.getElementById("button1").style.backgroundColor = "gray";
                        document.getElementById("button2").style.backgroundColor = "rgb(75, 184, 60)"; setFormData({ ...formData, ["role"]: "Patient" });
                        document.getElementById("Continuer-btn").style.backgroundColor = "rgb(75, 184, 60)";
                    }}
                    className={selected === "option2" ? "btn selected" : "btn"}
                    id='button2'
                    style={{margin:"0px",borderRadius:"20px",backgroundColor:"gray"}}
                    value={"Patient"}
                >
                    Patient
                </button>
            </div>
            <form onSubmit={handleSignup}>
            <div style={{ display: "flex",gap:"45px", alignItems: "center" }}>
                <img src="https://cdn-icons-png.flaticon.com/512/542/542689.png" width="32" height="32"
                style={{marginLeft:"-45px" }}/>
                <input style={{width:"300%", marginRight:"10px"}}
                    type="email"
                    name="email"
                    placeholder="Email"
                    value={formData.email}
                    onChange={handleChange}
                    required
                />
            </div>
            <div style={{ display: "flex",gap:"45px", alignItems: "center" }}>
                <img src="https://cdn-icons-png.flaticon.com/512/483/483408.png" width="32" height="32"
                style={{ marginLeft:"-45px" }}/>
                <input style={{width:"300%", marginRight:"10px"}}
                    type="password"
                    name="password"
                    placeholder="Mot de passe"
                    value={formData.password}
                    onChange={handleChange}
                    required
                />
                </div>
                <br></br>

                <button id='Continuer-btn' type="submit" style={{backgroundColor: "rgb(39, 104, 224)"}}>Continuer
                </button>

                <br></br><br></br>
                <p> ━━━━━ Ou Continuer Avec Google ━━━━━ </p>
       
                <button type="google-btn" onClick={handleSignup}
                style={{backgroundColor:"White", color:"black" ,marginBottom:"10px"}}>
                    <img width="32" height="32"
                    src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xNy42NCA5LjIwNWMwLS42MzktLjA1Ny0xLjI1Mi0uMTY0LTEuODQxSDl2My40ODFoNC44NDRhNC4xNCA0LjE0IDAgMCAxLTEuNzk2IDIuNzE2djIuMjU5aDIuOTA4YzEuNzAyLTEuNTY3IDIuNjg0LTMuODc1IDIuNjg0LTYuNjE1eiIgZmlsbD0iIzQyODVGNCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZD0iTTkgMThjMi40MyAwIDQuNDY3LS44MDYgNS45NTYtMi4xOGwtMi45MDgtMi4yNTljLS44MDYuNTQtMS44MzcuODYtMy4wNDguODYtMi4zNDQgMC00LjMyOC0xLjU4NC01LjAzNi0zLjcxMUguOTU3djIuMzMyQTguOTk3IDguOTk3IDAgMCAwIDkgMTh6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48cGF0aCBkPSJNMy45NjQgMTAuNzFBNS40MSA1LjQxIDAgMCAxIDMuNjgyIDljMC0uNTkzLjEwMi0xLjE3LjI4Mi0xLjcxVjQuOTU4SC45NTdBOC45OTYgOC45OTYgMCAwIDAgMCA5YzAgMS40NTIuMzQ4IDIuODI3Ljk1NyA0LjA0MmwzLjAwNy0yLjMzMnoiIGZpbGw9IiNGQkJDMDUiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGQ9Ik05IDMuNThjMS4zMjEgMCAyLjUwOC40NTQgMy40NCAxLjM0NWwyLjU4Mi0yLjU4QzEzLjQ2My44OTEgMTEuNDI2IDAgOSAwQTguOTk3IDguOTk3IDAgMCAwIC45NTcgNC45NThMMy45NjQgNy4yOUM0LjY3MiA1LjE2MyA2LjY1NiAzLjU4IDkgMy41OHoiIGZpbGw9IiNFQTQzMzUiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDBoMTh2MThIMHoiPjwvcGF0aD48L2c+PC9zdmc+" 
                    /> <p style={{fontSize:"medium" }}>S'inscrire avec Google</p></button>
                
            </form>
        </div>
        </div>
    );
};


export default Signuppat;