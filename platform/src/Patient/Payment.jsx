import React, { useState } from "react";

const Payment = ({ onClose }) => {
  const [method, setMethod] = useState("");
  const [ccpNumber, setCcpNumber] = useState("");
  const [ccpCle, setCcpCle] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiryDate, setExpiryDate] = useState("");
  const [cvv, setCvv] = useState("");
  const [paypalEmail, setPaypalEmail] = useState("");

  const handlePayment = () => {
    alert(`Paiement effectué avec ${method}`);
    console.log("Tentative de fermeture du popup");
    if (onClose) {
      onClose(); // Fermer le popup après paiement
    } else {
      console.error("onClose n'est pas défini !");
    }
  };

  return (
    <div className="payment-page">
      <h2>Paiement de la consultation</h2>

      {/* Sélection du moyen de paiement */}
      <label>Moyen de paiement</label>
      <select value={method} onChange={(e) => setMethod(e.target.value)}>
        <option value="">Sélectionner un moyen</option>
        <option value="ccp">Compte CCP</option>
        <option value="carte">Carte Bancaire</option>
        <option value="paypal">PayPal</option>
      </select>

      {/* Formulaire pour CCP */}
      {method === "ccp" && (
        <div className="payment-form">
          <label>Numéro CCP</label>
          <input 
            type="text" 
            placeholder="Ex: 1234567"
            value={ccpNumber}
            onChange={(e) => setCcpNumber(e.target.value)}
          />
          
          <label>Clé CCP</label>
          <input 
            type="text" 
            placeholder="Ex: 97"
            value={ccpCle}
            onChange={(e) => setCcpCle(e.target.value)}
          />
        </div>
      )}

      {/* Formulaire pour Carte Bancaire */}
      {method === "carte" && (
        <div className="payment-form">
          <label>Numéro de Carte</label>
          <input 
            type="text" 
            placeholder="Ex: 1234 5678 9012 3456"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          
          <label>Date d'expiration</label>
          <input 
            type="month"
            value={expiryDate}
            onChange={(e) => setExpiryDate(e.target.value)}
          />
          
          <label>CVV</label>
          <input 
            type="text" 
            placeholder="Ex: 123"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
          />
        </div>
      )}

      {/* Formulaire pour PayPal */}
      {method === "paypal" && (
        <div className="payment-form">
          <label>Email PayPal</label>
          <input 
            type="email" 
            placeholder="Ex: email@paypal.com"
            value={paypalEmail}
            onChange={(e) => setPaypalEmail(e.target.value)}
          />
        </div>
      )}

      <button 
        onClick={handlePayment} 
        className="confirm-payment"
        disabled={!method}
      >
        Confirmer le paiement
      </button>
    </div>
  );
};

export default Payment;
