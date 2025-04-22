import React, { useState } from 'react';
import Sidebarradio from '../Commun/Navigation/Sidebarradio';
import NavbarProfilM from '../Commun/Navigation/NavbarProfilM';

const Compterendue = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  // Patient Info State
  const [patientInfo, setPatientInfo] = useState({
    nom: 'Dupont',
    prenom: 'Jean',
    age: '45',
    sexe: 'Masculin',
    id: '123456'
  });
  const [isEditingPatient, setIsEditingPatient] = useState(false);

  // Report Details State
  const [reportDetails, setReportDetails] = useState({
    examDate: '10 Mars 2025',
    description: "Examen radiologique réalisé pour évaluer l'état des poumons.",
    observations: [
      'Infiltrats localisés dans le lobe supérieur droit',
      'Absence de consolidation significative',
      'Signes d’inflammation modérée'
    ]
  });
  const [isEditingReport, setIsEditingReport] = useState(false);
  const [newObservation, setNewObservation] = useState('');

  // Conclusion State
  const [conclusion, setConclusion] = useState(
    "Les résultats suggèrent une inflammation modérée sans signes aigus. Suivi et examens complémentaires recommandés."
  );
  const [isEditingConclusion, setIsEditingConclusion] = useState(false);

  // Inline styles
  const styles = {
    container: {
      padding: '20px',
      margin: '0 auto',
      maxWidth: '800px'
    },
    header: {
      borderBottom: '1px solid #ccc',
      marginBottom: '20px'
    },
    section: {
      marginBottom: '20px',
      padding: '15px',
      border: '1px solid #ddd',
      borderRadius: '5px'
    },
    formGroup: {
      display: 'flex',
      flexDirection: 'column',
      gap: '10px',
      marginBottom: '20px'
    },
    input: {
      padding: '8px',
      fontSize: '16px'
    },
    textarea: {
      padding: '8px',
      fontSize: '16px',
      width: '100%',
      minHeight: '80px'
    },
    button: {
      padding: '8px 16px',
      fontSize: '16px',
      marginRight: '10px',
      cursor: 'pointer'
    },
    observationList: {
      paddingLeft: '20px'
    }
  };

  // Handlers for Patient Info
  const handlePatientChange = (e) => {
    setPatientInfo({ ...patientInfo, [e.target.name]: e.target.value });
  };

  const savePatientInfo = () => {
    setIsEditingPatient(false);
  };

  // Handlers for Report Details
  const handleReportChange = (e) => {
    setReportDetails({ ...reportDetails, [e.target.name]: e.target.value });
  };

  const saveReportDetails = () => {
    setIsEditingReport(false);
  };

  const addObservation = () => {
    if (newObservation.trim() !== '') {
      setReportDetails({
        ...reportDetails,
        observations: [...reportDetails.observations, newObservation.trim()]
      });
      setNewObservation('');
    }
  };

  // Handlers for Conclusion
  const saveConclusion = () => {
    setIsEditingConclusion(false);
  };

  return (
    <div>
      <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebarradio isOpen={isSidebarOpen} />

      <main className={`main-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1>Compte Rendu</h1>
            <p>Rapport de radiologie - Vue du Radiologue</p>
          </header>

          {/* Patient Information Section */}
          <section style={styles.section}>
            <h2>Informations du Patient</h2>
            {isEditingPatient ? (
              <div style={styles.formGroup}>
                <label>
                  Nom:
                  <input
                    style={styles.input}
                    type="text"
                    name="nom"
                    value={patientInfo.nom}
                    onChange={handlePatientChange}
                  />
                </label>
                <label>
                  Prénom:
                  <input
                    style={styles.input}
                    type="text"
                    name="prenom"
                    value={patientInfo.prenom}
                    onChange={handlePatientChange}
                  />
                </label>
                <label>
                  Âge:
                  <input
                    style={styles.input}
                    type="number"
                    name="age"
                    value={patientInfo.age}
                    onChange={handlePatientChange}
                  />
                </label>
                <label>
                  Sexe:
                  <input
                    style={styles.input}
                    type="text"
                    name="sexe"
                    value={patientInfo.sexe}
                    onChange={handlePatientChange}
                  />
                </label>
                <label>
                  ID Patient:
                  <input
                    style={styles.input}
                    type="text"
                    name="id"
                    value={patientInfo.id}
                    onChange={handlePatientChange}
                  />
                </label>
                <div>
                  <button style={styles.button} onClick={savePatientInfo}>
                    Enregistrer
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => setIsEditingPatient(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Nom:</strong> {patientInfo.nom}
                </p>
                <p>
                  <strong>Prénom:</strong> {patientInfo.prenom}
                </p>
                <p>
                  <strong>Âge:</strong> {patientInfo.age}
                </p>
                <p>
                  <strong>Sexe:</strong> {patientInfo.sexe}
                </p>
                <p>
                  <strong>ID Patient:</strong> {patientInfo.id}
                </p>
                <button
                  style={styles.button}
                  onClick={() => setIsEditingPatient(true)}
                >
                  Modifier les informations
                </button>
              </div>
            )}
          </section>

          {/* Report Details Section */}
          <section style={styles.section}>
            <h2>Détails du Compte Rendu</h2>
            {isEditingReport ? (
              <div style={styles.formGroup}>
                <label>
                  Date de l'examen:
                  <input
                    style={styles.input}
                    type="text"
                    name="examDate"
                    value={reportDetails.examDate}
                    onChange={handleReportChange}
                  />
                </label>
                <label>
                  Description:
                  <textarea
                    style={styles.textarea}
                    name="description"
                    value={reportDetails.description}
                    onChange={handleReportChange}
                  />
                </label>
                <div>
                  <h3>Observations</h3>
                  <ul style={styles.observationList}>
                    {reportDetails.observations.map((obs, index) => (
                      <li key={index}>{obs}</li>
                    ))}
                  </ul>
                  <div style={styles.formGroup}>
                    <input
                      style={styles.input}
                      type="text"
                      placeholder="Nouvelle observation"
                      value={newObservation}
                      onChange={(e) => setNewObservation(e.target.value)}
                    />
                    <button style={styles.button} onClick={addObservation}>
                      Ajouter
                    </button>
                  </div>
                </div>
                <div>
                  <button style={styles.button} onClick={saveReportDetails}>
                    Enregistrer
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => setIsEditingReport(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>
                  <strong>Date de l'examen:</strong> {reportDetails.examDate}
                </p>
                <p>
                  <strong>Description:</strong> {reportDetails.description}
                </p>
                <div>
                  <h3>Observations</h3>
                  <ul style={styles.observationList}>
                    {reportDetails.observations.map((obs, index) => (
                      <li key={index}>{obs}</li>
                    ))}
                  </ul>
                </div>
                <button
                  style={styles.button}
                  onClick={() => setIsEditingReport(true)}
                >
                  Modifier le compte rendu
                </button>
              </div>
            )}
          </section>

          {/* Conclusion Section */}
          <section style={styles.section}>
            <h2>Conclusion</h2>
            {isEditingConclusion ? (
              <div style={styles.formGroup}>
                <textarea
                  style={styles.textarea}
                  value={conclusion}
                  onChange={(e) => setConclusion(e.target.value)}
                  rows="4"
                />
                <div>
                  <button style={styles.button} onClick={saveConclusion}>
                    Enregistrer
                  </button>
                  <button
                    style={styles.button}
                    onClick={() => setIsEditingConclusion(false)}
                  >
                    Annuler
                  </button>
                </div>
              </div>
            ) : (
              <div>
                <p>{conclusion}</p>
                <button
                  style={styles.button}
                  onClick={() => setIsEditingConclusion(true)}
                >
                  Modifier la conclusion
                </button>
              </div>
            )}
          </section>

          {/* Actions Section */}
          <section style={styles.section}>
            <button style={styles.button} type="button">
              Imprimer le rapport
            </button>
            <button style={styles.button} type="button">
              Envoyer au dossier patient
            </button>
          </section>
        </div>
      </main>
    </div>
  );
};

export default Compterendue;
