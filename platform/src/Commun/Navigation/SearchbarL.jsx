import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./SearchbarL.css";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    if (query.length > 1) {
      fetch(`http://localhost:5000/search?query=${query}`)
        .then((res) => res.json())
        .then((data) => setResults(data))
        .catch((err) => console.error(err));
    } else {
      setResults([]);
    }
  }, [query]);

  return (
    <div className="searchbarl-container">
      <div className="searchl-box">
        <input
          type="text"
          className="searchl-input"
          value={query}
          placeholder="Rechercher votre médecin"
          onChange={(e) => setQuery(e.target.value)}
        />
       
          <img
            className="searchl-icon"
            src="https://www.citypng.com/public/uploads/preview/orange-search-icon-button-free-png-701751694974782ivlbouhgd8.png "
            alt="search"
          />
      </div>

      <div className="resultsl-container">
        {results.map((user, index) => (
          <div key={index} className="resultl-item">
            <span style={{width:"450px",marginLeft:"10px"
            }}>{user.nom} {user.prenom}</span>
            <div className="buttonsl">
              <button className="view-buttonl" onClick={()=>navigate("/forum")}>💬</button>
              <button className="book-buttonl" onClick={()=>navigate(`/Rdvdem?medecin_id=${user.medecin_id}&nom=${user.nom}&prenom=${user.prenom}`)}>✚</button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
