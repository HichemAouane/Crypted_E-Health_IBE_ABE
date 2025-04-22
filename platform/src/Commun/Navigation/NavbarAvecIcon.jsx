import React,{useState} from "react";
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./NavbarIcon.css";
import Refresh from "../Refresh";
import SearchbarL from "./SearchbarL";

const NavbarAvecIcon = ({ toggleSidebar }) => {
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();
    

  return (
    <nav className="navbar">

        <div className="navbar-left">
            <button className="menu-btn" onClick={toggleSidebar}>
            <FaBars />
            </button>
            <Refresh />
        </div>

        <div className="navbar-centeri">
            <SearchbarL />
        </div>

        <div className="navbar-righti">

        <div className="profile-container">
                    <Link to="/choice">
                        <img style={{width:"80px"}}
                            src="   https://cdn-icons-png.flaticon.com/512/18827/18827851.png " 
                        />
                    </Link>
                </div>
      </div>
    </nav>
  );
};

export default NavbarAvecIcon;
