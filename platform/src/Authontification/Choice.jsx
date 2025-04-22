import React, { memo, useState } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import Navbar from '../Commun/Navigation/Navbar';
import Login from './Login';
import '../Commun/Navigation/Nav.css';
import { auth, provider, signInWithPopup, signInWithEmailAndPassword } from './firebase'; 

const Choice = memo(() => {
    const [isLogin, setIsLogin] = useState(true);
    const navigate = useNavigate();

    // Gestion de la connexion avec email/mot de passe
    const handleEmailLogin = async (email, password) => {
        try {
            const userCredential = await signInWithEmailAndPassword(auth, email, password);
            console.log("Utilisateur connecté :", userCredential.user);
            alert("Connexion réussie !");
        } catch (error) {
            console.error("Erreur de connexion :", error.message);
            alert("Erreur de connexion : " + error.message);
        }
    };

    // Gestion de la connexion avec Google
    const handleGoogleLogin = async () => {
        try {
            const result = await signInWithPopup(auth, provider);
            console.log("Utilisateur connecté avec Google :", result.user);
            alert("Connexion Google réussie !");
        } catch (error) {
            console.error("Erreur de connexion Google :", error.message);
            alert("Erreur de connexion Google : " + error.message);
        }
    };

    // Redirection vers RoleSelection pour l'inscription
    const handleSwitchToSignup = () => {
        navigate('/signup');
    };
    const handleForgetPassword = () => {
        navigate('/Reset-password');
    }
     const [isSidebarOpen, setIsSidebarOpen] = useState(true);
     return (
        <div>
          <Navbar />
          <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
            <div>
                    {isLogin ? (
                        <Login
                            onSwitchToSignup={handleSwitchToSignup} 
                            onGoogleLogin={handleGoogleLogin}
                            onEmailLogin={handleEmailLogin}
                            onForgetPasseword={handleForgetPassword}
                        />
                    ) : null}
                </div>
          </main>
        </div>
      );

});

export default Choice;