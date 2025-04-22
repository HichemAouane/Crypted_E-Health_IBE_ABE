import React,{useState} from "react";
import Refresh from '../Refresh';
import { FaBars } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";
import "./Navbar.css";
import Searchbar from "./Searchbar";

const Navbar = ({ toggleSidebar }) => {
    
     const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const navigate = useNavigate();


    return (
        <nav className="navbar">
    
            <div className="navbar-left">     
                <Refresh />
            </div>
    
          
        </nav>
      );
  
}

export default Navbar