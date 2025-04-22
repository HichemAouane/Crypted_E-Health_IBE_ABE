import React, { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import mqtt from "mqtt";
import axios from "axios";
import "./chat.css";
import NavbarProfilP from "../Commun/Navigation/NavbarProfilP";
import Sidebar from "../Commun/Navigation/Sidebar";
import SidebarListM from "./SidebarListM";
import SidebarListG from "./SidebarListG";

const ChatP = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const medecinIdFromUrl = searchParams.get("medecin_id");

  const senderId = sessionStorage.getItem("profile_id");
  const [recipientId, setRecipientId] = useState(medecinIdFromUrl || null);
  const [medics, setMedics] = useState([]);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [client, setClient] = useState(null);
  const [collapsed, setCollapsed] = useState(false);
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  
  
  const messagesEndRef = useRef(null);

  const toggleSidebar = () => {
    setCollapsed(!collapsed);
  };

  useEffect(() => {
    console.log(senderId)
    axios.get(`http://localhost:5000/get_med_for_patient?patient_id=${senderId}`)
      .then(response => {setMedics(response.data);console.log(response.data)})
      .catch(error => console.error("Error fetching medics:", error));
  }, [senderId]);

  useEffect(() => {
    if (!recipientId) return;
  
    axios.get(`http://localhost:5000/messages?expediteur_id=${senderId}&destinataire_id=${recipientId}`)
      .then(response => {
        setMessages(response.data);
      })
      .catch(error => console.error("Error fetching messages:", error));
  }, [recipientId, senderId]);

  useEffect(() => {
    if (!recipientId) return;

    const mqttClient = mqtt.connect("ws://localhost:9001");
    mqttClient.on("connect", () => {
      console.log("Connected to MQTT Broker");
      mqttClient.subscribe(`chat/${senderId}/${recipientId}`);
      mqttClient.subscribe(`chat/${recipientId}/${senderId}`);
    });

    mqttClient.on("message", (topic, payload) => {
      const receivedMessage = JSON.parse(payload.toString());
      setMessages(prev => [...prev, receivedMessage]);
    });

    setClient(mqttClient);

    return () => {
      mqttClient.end();
    };
  }, [recipientId]);

  const sendMessage = () => {
    if (!message.trim() || !recipientId) return;
    
    const messageObj = {
      expediteur_id: senderId,
      destinataire_id: recipientId,
      contenu: message,
      statut: "sent",
      date_heure: new Date().toLocaleString("fr-FR", {
        year: "numeric",
        month: "2-digit",
        day: "2-digit",
        hour: "2-digit",
        minute: "2-digit",
        second: "2-digit",
        hour12: true,
      }),
    };

    client.publish(`chat/${senderId}/${recipientId}`, JSON.stringify(messageObj));
    setMessage("");
  };

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div>
      <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main style={{marginTop:"115px"}} className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className={`chat-container ${isSidebarOpen ? "expandedd" : "collapsedd"}`}>
        {recipientId ? (
              <>
          <div className="chat-boxx">
            {recipientId ? (
              <>
                <div className="messages">
                  {messages.map((msg, index) => (
                    
                    <>
                    
                      <div key={index} className={`message ${msg.expediteur_id === senderId ? "sent" : "received"}`}>
                      {msg.contenu}
                      </div>
                      <span className={`${msg.expediteur_id === senderId ? "sent-time" : "received-time"}`}>{String(msg.date_heure)}</span>
                    </>
                    
                  ))}
                  <div ref={messagesEndRef} /> </div>
                <div className="input-containerd">
                  <input
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                  />
                  <button onClick={sendMessage} className="btncolor">
                  <img className="imgbtn" src="https://cdn-icons-png.flaticon.com/512/9333/9333991.png " />
                  </button>
                </div>
              </>
            ) : (
              <p>Select a Medecin to start chatting.</p>
            )}
          </div>

          
          <SidebarListG  medics={medics} setRecipientId={setRecipientId}  selectedRecipient={recipientId}  />
          </>
        ) : (
          <SidebarListM  medics={medics} setRecipientId={setRecipientId}  selectedRecipient={recipientId}  />
            )}
          </div>

      </main>
    </div>
    
  );
};

export default ChatP;
