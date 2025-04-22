import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./SearchbarM.css";
import Filterm from "./Filterm"

const SearchbarM = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  return (
    <div className="searchbarm-container">
      <div className="search-boxm">
      <Filterm setResults={setResults} query={query} setQuery={setQuery} />
        <input
          type="text"
          className="searchm-input"
          value={query}
          placeholder="Rechercher un médecin"
          onChange={(e) => setQuery(e.target.value)}
        />
        <img
          className="searchm-icon"
          src="https://www.citypng.com/public/uploads/preview/download-blue-search-icon-button-png-7017516949747893a50ute33v.png"
          alt="searchm"
        />
      </div>

      <div className="resultsm-container">
        {results.filter((user) => user.profile_id !== sessionStorage.getItem("profile_id")).map((user, index) => (
          <div key={index} className="resultm-item">
            <span style={{marginLeft:"10px"
            }}>{user.nom} {user.prenom}</span>

          </div>
        ))}
      </div>
    </div>
  );
};

export default SearchbarM;
