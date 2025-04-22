import React, { useState, useEffect } from "react";
import { FiAlignCenter } from "react-icons/fi";
import wilayas from "./wilayas.json";
import communesData from "./communs.json";

const Filter = ({ setResults, query, setQuery }) => {
  const [filters, setFilters] = useState({
    role:"Medecin",
    willaya: "",
    commune: "",
    sexe: "",
    specialite: "",
  });
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  useEffect(() => {
    const fetchDoctors = async () => {

      if (!filters.role) return;

      let url = `http://localhost:5000/search`;
  
      const params = new URLSearchParams();
      if (query) params.append("query", query);
      Object.keys(filters).forEach((key) => {
        if (filters[key]) params.append(key, filters[key]);
      });
  
      const profile_id = sessionStorage.getItem("profile_id");
      if (profile_id) {
        params.append(filters.role.toLowerCase() === "patient" ? "patient_id" : "medecin_id", profile_id);
      }
  
      try {
        const response = await fetch(`${url}?${params.toString()}`);
        const data = await response.json();
        setResults(data);
      } catch (err) {
        console.error("Error fetching doctors:", err);
      }
    };
  
    if (query.length === 0) {
      setResults([]);
      return;
    }
  
    if (query.length > 0 || Object.values(filters).some((value) => value)) {
      fetchDoctors();
    }
  }, [query, filters, setResults]);

  const handleFilterChange = (key, value) => {
    setFilters((prevFilters) => ({
      ...prevFilters,
      [key]: value,
    }));
  };

  return (
    <div className="filters-container" >
      <button onClick={() => setIsDropdownOpen(!isDropdownOpen)} className="btn-icons">
        <FiAlignCenter size={50} />
      </button>

      {isDropdownOpen && (
        <div className="dropdown-menu-filter" style={{marginTop:"-15px"}}>
          <label>Role:
            <select 
                onChange={(e) => {handleFilterChange("role", e.target.value)}}
                value={filters.role}>
              <option value="Patient">Patient</option>
              <option value="Medecin">Medecin</option>
            </select>
          </label>


          <label>Willaya:
            <select 
                onChange={(e) => {handleFilterChange("willaya", e.target.value); handleFilterChange("commune", "");}}
                value={filters.willaya}
                disabled={filters.role==="Patient"}
                >   
              <option value="">Toutes</option>
              {wilayas.map((wilaya, index) => (
                <option key={index} value={wilaya}>{wilaya}</option>
              ))}
            </select>
          </label>

          <label>Commune:
            <select 
                onChange={(e) => handleFilterChange("commune", e.target.value)}
                value={filters.commune}
                disabled={!filters.willaya || filters.role==="Patient"}>
              <option value="">Toutes</option>
              {filters.willaya &&
                communesData[filters.willaya]?.map((commune, index) => (
                  <option key={index} value={commune}>{commune}</option>
                ))
              }
            </select>
          </label>

          <label>Sexe:
            <select 
                onChange={(e) => handleFilterChange("sexe", e.target.value)}
                value={filters.sexe}
            >
                <option value="">Tous</option>
                <option value="Masculin">Homme</option>
                <option value="Féminin">Femme</option>
            </select>
            </label>

            <label>Spécialité:
            <select 
                onChange={(e) => handleFilterChange("specialite", e.target.value)}
                value={filters.specialite}
                disabled={filters.role==="Patient"}
            >
                <option value="">Toutes</option>
                <option value="Cardiologie">Cardiologue</option>
                <option value="Dentiste">Dentiste</option>
                <option value="Généraliste">Médecin Généraliste</option>
            </select>
            </label>
        </div>
      )}
    </div>
  );
};

export default Filter;
