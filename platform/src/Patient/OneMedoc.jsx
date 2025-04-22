import React from 'react'

const OneMedoc = ({med}) => {
  return (
    <tr>
      <td>{med.Date_de_Prescription || "N/A"}</td>
      <td>{med.Medecin || "N/A"}</td>
      <td>{med.Medicament || "N/A"}</td>
      <td>{med.Dosage || "N/A"}</td>
      <td>{med.Posologie || "N/A"}</td>
      <td>{med.Momment || "N/A"}</td>
      <td>{med.Duree || "N/A"}</td>
      <td>{med.Description || "N/A"}</td>
      <td>{med.Substituable || "N/A"}</td>
    </tr>
  );
}

export default OneMedoc
