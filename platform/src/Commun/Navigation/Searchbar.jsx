import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./Searchbar.css";
import Filter from "./Filterp";

const Searchbar = () => {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const navigate = useNavigate();
  

  return (
    <div className="searchbar-container">
      <div className="search-box">
        <Filter setResults={setResults} query={query} setQuery={setQuery} />
        <input
          type="text"
          className="search-input"
          value={query}
          placeholder="Rechercher votre médecin"
          onChange={(e) => setQuery(e.target.value)}
        />

        <img
          className="search-icon"
          src="https://www.citypng.com/public/uploads/preview/transparent-green-search-icon-button-701751694974776irvseksyfy.png"
          alt="search"
        />
      </div>

      <div className="results-container">
        {results.map((user, index) => (
          <div key={index} className="result-item">
            <span style={{marginLeft: "10px" }}>
              {user.nom} {user.prenom}
            </span>
            <div className="buttons">
              {user.is_associated ? (
                <>
                  
                  <button
                    className="book-button"
                    onClick={() =>
                      navigate(
                        `/Rdvdem?medecin_id=${user.profile_id}&nom=${user.nom}&prenom=${user.prenom}`
                      )
                    }
                  >
                    ✚
                  </button>
                  <button
                    className="view-button"
                    onClick={() => {navigate(`/chatp?medecin_id=${user.profile_id}`);navigate(0)}}
                  >
                    💬
                  </button>
                </>
              ) : (
                <button
                  className="book-button"
                  onClick={() =>
                    navigate(
                      `/Rdvdem?medecin_id=${user.profile_id}&nom=${user.nom}&prenom=${user.prenom}`
                    )
                  }
                >
                  ✚
                </button>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Searchbar;
