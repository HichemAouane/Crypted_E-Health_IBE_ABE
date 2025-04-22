import React,{useState,useEffect} from "react";
import { FaBars ,FaFilter  } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import Refresh from "../Refresh";
import SearchbarM from "./SearchbarM";


const NavbarProfilM = ({ toggleSidebar }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [user, setUser] = useState(null);
    const navigate = useNavigate();
    const profile_id = sessionStorage.getItem("profile_id");
     
    useEffect(() => {
        const fetchUser = async () => {
            if (!profile_id) return;

            try {
                const response = await fetch(`http://localhost:5000/get-user-info?profile_id=${profile_id}`);

                if (!response.ok) {
                    throw new Error("Failed to fetch user data");
                }

                const data = await response.json();
                setUser(data);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };

        fetchUser();
    }, [profile_id]);
    
  
    
    const handleProfileNavigation = () => {
        console.log("ss",user)
        navigate(user?.role === "Patient" 
            ? "/infop" 
            : (user?.specialite === "Radiologue" 
                ? "/infor" 
                : "/infom"));
        
    };
  return (
    <nav className="navbar">

        <div className="navbar-left">
            <button className="menu-btn" onClick={toggleSidebar}>
            <FaBars />
            </button>
            <Refresh />
        </div>
        
     
        <div className="navbar-center">
            <SearchbarM />
        </div>

        <div className="navbar-right">
         
            <span className="profile-name">Dr. {user?.nom || "Utilisateur"}</span>        

            <div className="profile-container"
                 onMouseEnter={() => setIsDropdownOpen(true)}
                 onMouseLeave={() => setIsDropdownOpen(false)}
            >
                    
                <img
                    src={
                        user?.photo ||
                        "https://static.vecteezy.com/ti/vecteur-libre/p1/14194216-icone-d-avatar-humain-le-badge-d-une-personne-vecteur-symbole-de-profil-de-medias-sociaux-le-symbole-d-une-personne-vectoriel.jpg"
                    }
                    alt="Profile"
                    className="profile-pic"
                />
                                                   
                {isDropdownOpen && (
                    <ul className="dropdown-menu">
                        <li onClick={handleProfileNavigation}>Mon Profil</li>
                        <li>
                            <Link to="/Settingspat">Settings</Link>
                        </li>
                        <li on onClick={()=> {alert("You are loged out"); sessionStorage.clear(); 
                        window.location.href = "/choice"}}>
                            Logout
                        </li>
                    </ul>
                )}
            </div>
      </div>
    </nav>
  );
};

export default NavbarProfilM;
