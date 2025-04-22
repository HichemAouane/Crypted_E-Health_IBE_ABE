import React, { useState } from "react";
import { useNavigate, Link } from 'react-router-dom';
import "./Auth.css";
import "./buttonslogin.css"

const Login = ({ onSwitchToSignup, onGoogleLogin, onEmailLogin, onForgetPasseword }) => {

  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const navigate = useNavigate();

  

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await fetch("http://127.0.0.1:5000/loginboth", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(formData),
      });
  
      const data = await response.json();
      console.log(data)
      if (response.ok) {
          alert("Connexion réussie!");
          console.log(data)
          if (data.role === "Medecin") {
            if(data.profileinformation==="Radiologue"){
              sessionStorage.setItem("user_id", data.user_id);
              sessionStorage.setItem("profile_id", data.profile_id);
              sessionStorage.setItem("typedecompte", data.role);
              window.location.href = "/princR"
              
            }else{
              sessionStorage.setItem("user_id", data.user_id);
              sessionStorage.setItem("profile_id", data.profile_id);
              sessionStorage.setItem("typedecompte", data.role);
              window.location.href = "/princm"}

              
          } else if (data.role === "Patient") {
            if(true){
              sessionStorage.setItem("user_id", data.user_id);
              sessionStorage.setItem("profile_id", data.profile_id);
              sessionStorage.setItem("typedecompte", data.role);
              window.location.href = "/princP"
                           
            }else{navigate('/patient');}

              
          }
      } else {
          alert("Erreur: " + data.error);
      }
  } catch (error) {
      console.error("Error:", error);
      alert("Erreur de connexion au serveur.");
  }
  
    };

  return (
    <div className="auth-container" style={{width:"600px",marginRight:"310px"}}>
      <h2>Connexion</h2>
        
      <form onSubmit={handleSubmit}>
      
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
                <button type="submit">Continuer</button>
      </form>
      <br></br><br></br>
      <p> ━━━━━ Ou Continuer Avec Google ━━━━━ </p>
       
      <button type="google-btn" onClick={onGoogleLogin}
      style={{backgroundColor:"White", color:"black" }}>
          <img width="32" height="32" 
          src="data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMTgiIGhlaWdodD0iMTgiIHZpZXdCb3g9IjAgMCAxOCAxOCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxwYXRoIGQ9Ik0xNy42NCA5LjIwNWMwLS42MzktLjA1Ny0xLjI1Mi0uMTY0LTEuODQxSDl2My40ODFoNC44NDRhNC4xNCA0LjE0IDAgMCAxLTEuNzk2IDIuNzE2djIuMjU5aDIuOTA4YzEuNzAyLTEuNTY3IDIuNjg0LTMuODc1IDIuNjg0LTYuNjE1eiIgZmlsbD0iIzQyODVGNCIgZmlsbC1ydWxlPSJub256ZXJvIj48L3BhdGg+PHBhdGggZD0iTTkgMThjMi40MyAwIDQuNDY3LS44MDYgNS45NTYtMi4xOGwtMi45MDgtMi4yNTljLS44MDYuNTQtMS44MzcuODYtMy4wNDguODYtMi4zNDQgMC00LjMyOC0xLjU4NC01LjAzNi0zLjcxMUguOTU3djIuMzMyQTguOTk3IDguOTk3IDAgMCAwIDkgMTh6IiBmaWxsPSIjMzRBODUzIiBmaWxsLXJ1bGU9Im5vbnplcm8iPjwvcGF0aD48cGF0aCBkPSJNMy45NjQgMTAuNzFBNS40MSA1LjQxIDAgMCAxIDMuNjgyIDljMC0uNTkzLjEwMi0xLjE3LjI4Mi0xLjcxVjQuOTU4SC45NTdBOC45OTYgOC45OTYgMCAwIDAgMCA5YzAgMS40NTIuMzQ4IDIuODI3Ljk1NyA0LjA0MmwzLjAwNy0yLjMzMnoiIGZpbGw9IiNGQkJDMDUiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGQ9Ik05IDMuNThjMS4zMjEgMCAyLjUwOC40NTQgMy40NCAxLjM0NWwyLjU4Mi0yLjU4QzEzLjQ2My44OTEgMTEuNDI2IDAgOSAwQTguOTk3IDguOTk3IDAgMCAwIC45NTcgNC45NThMMy45NjQgNy4yOUM0LjY3MiA1LjE2MyA2LjY1NiAzLjU4IDkgMy41OHoiIGZpbGw9IiNFQTQzMzUiIGZpbGwtcnVsZT0ibm9uemVybyI+PC9wYXRoPjxwYXRoIGQ9Ik0wIDBoMTh2MThIMHoiPjwvcGF0aD48L2c+PC9zdmc+" 
          /><p style={{fontSize:"medium" }}>S'inscrire avec Google</p></button>

          <br></br>
                                 
      <p>
        Pas de compte ?{" "}
        <span className="switch-link" onClick={onSwitchToSignup}>
          S'inscrire
        </span>
      </p>
      <span className="switch-link" onClick={onForgetPasseword}>Mot de passe oublié ?</span>
    </div>
  );
};

export default Login;