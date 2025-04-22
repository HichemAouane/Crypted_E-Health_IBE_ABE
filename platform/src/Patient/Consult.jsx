import React, { useRef, useState } from "react";
import Sidebar from "../Commun/Navigation/Sidebar";
import NavbarProfilP from "../Commun/Navigation/NavbarProfilP";
import { useNavigate } from "react-router-dom";
import Payment from "./Payment";


const Consult = () => {
  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const navigate = useNavigate(); 
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [stream, setStream] = useState(null);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);



  const startCall = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = userStream; // Affiche la vidéo locale
      }
    } catch (error) {
      console.error("Erreur lors de l'accès aux médias :", error);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
      setVideoUrl(null);
    }
  };


  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach(track => track.enabled = !track.enabled);
      setIsMicOn(prev => !prev);
    }
  };

  const toggleCam = () => {
    if (stream) {
      stream.getVideoTracks().forEach(track => track.enabled = !track.enabled);
      setIsCamOn(prev => !prev);
    }
  };

  const handlePayment = () => {
    navigate("/payment"); // Redirige vers une page de paiement (à créer)
  };

  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  return (
    <div>
      <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="contentv-p">


          <div className="video-call-containerP">
            <div className="video-wrapperP">
              <video ref={remoteVideoRef} autoPlay playsInline className="video-feed largeP" />
              <video ref={localVideoRef} autoPlay playsInline className="video-feed smallP" />
            </div>

            <div className="call-controlsP">
              <button onClick={startCall}>📞</button>
              <button onClick={toggleMic} className={isMicOn ? "" : "mic-off"}>{isMicOn ? "🎤" : "🔇"}</button>
              <button onClick={toggleCam} className={isCamOn ? "" : "cam-off"}>{isCamOn ? "📷" : "🚫"}</button>
              <button onClick={endCall} className="end-call">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733497.png" alt="End Call" />
              </button>
            </div>
          </div>

          <div className="payment-container">
            <button className="payment-button"
              onClick={() => setIsPopupOpen(true)}> 
              💳 Payer la consultation
            </button>
          </div>

        </div>
      </main>
      {isPopupOpen && (
        <div className="popup-overlay">
            <div className="popup-content">
                <button className="popup-close" onClick={() => setIsPopupOpen(false)}>X</button>
                <Payment />
            </div>
        </div>
      )}
    </div>
  );
};

export default Consult;