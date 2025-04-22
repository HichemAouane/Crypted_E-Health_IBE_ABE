import React, { useRef, useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import "./ConsultV.css";
import SidebarM from "../Commun/Navigation/SidebarM";
import NavbarProfilM from "../Commun/Navigation/NavbarProfilM";
import Ordonnance from "./Ordonnance";
import Constante from "./Constante";
import Rapport from "./Rapport";
import Hist from "../Patient/Hist";

const ConsultV = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const patient_id = searchParams.get("patient_id");
  const consultation_id = searchParams.get("consultation_id");
  const [patient, setPatient] = useState(null);

  const localVideoRef = useRef(null);
  const remoteVideoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const [stream, setStream] = useState(null);
  const [recording, setRecording] = useState(false);
  const [videoUrl, setVideoUrl] = useState(null);
  const [isMicOn, setIsMicOn] = useState(true);
  const [isCamOn, setIsCamOn] = useState(true);
  const chunks = useRef([]);
  const [activeTab, setActiveTab] = useState("Historique");
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);


  useEffect(() => {
    const fetchPatientInfo = async () => {
      if (!patient_id) return;
  
      try {
        const response = await fetch(`http://localhost:5000/get-user-info?profile_id=${patient_id}`);
        const data = await response.json();
  
        if (!response.ok) {
          console.error("Error fetching patient data:", data.error);
          return;
        }
  
        setPatient(data);
      } catch (error) {
        console.error("Error fetching patient info:", error);
      }
    };
  
    fetchPatientInfo();
  }, [patient_id]);


  const startCall = async () => {
    try {
      const userStream = await navigator.mediaDevices.getUserMedia({
        video: true,
        audio: true,
      });
      setStream(userStream);

      if (localVideoRef.current) {
        localVideoRef.current.srcObject = userStream;
      }
    } catch (error) {
      console.error("Erreur lors de l'accès aux médias :", error);
    }
  };

  const endCall = () => {
    if (stream) {
      stream.getTracks().forEach((track) => track.stop());
      setStream(null);
      setVideoUrl(null);
    }
  };

  const startRecording = () => {
    if (!stream) return;
    chunks.current = [];
    const mediaRecorder = new MediaRecorder(stream);
    mediaRecorderRef.current = mediaRecorder;
    mediaRecorder.ondataavailable = (event) => chunks.current.push(event.data);
    mediaRecorder.onstop = () => {
      const blob = new Blob(chunks.current, { type: "video/webm" });
      setVideoUrl(URL.createObjectURL(blob));
    };
    mediaRecorder.start();
    setRecording(true);
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
    }
  };

  const toggleMic = () => {
    if (stream) {
      stream.getAudioTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsMicOn((prev) => !prev);
    }
  };

  const toggleCam = () => {
    if (stream) {
      stream.getVideoTracks().forEach((track) => (track.enabled = !track.enabled));
      setIsCamOn((prev) => !prev);
    }
  };

  return (
    <div>
      <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <SidebarM isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div className="contentv">
          <div className="left-section" style={{marginRight:"300px"}}>
            <div className="patient-info">
              <h2>Consultation de {patient ? `${patient.nom} ${patient.prenom}` : "Chargement..."}</h2>
            </div>

            <div className="Btnchoixv">
              <button className={`Historique ${activeTab === "Historique" ? "active" : ""}`} onClick={() => setActiveTab("Historique")}>
                Patient
              </button>
              <button className={`Ordonance ${activeTab === "Ordonnance" ? "active" : ""}`} onClick={() => setActiveTab("Ordonnance")}>
                Ordonnance
              </button>
              <button className={`Rapport ${activeTab === "Rapport" ? "active" : ""}`} onClick={() => setActiveTab("Rapport")}>
                Rapport
              </button>
            </div>

            <div className="info-patient">{activeTab === "Historique" && <Hist patientId={patient_id} />}</div>

            <div className="med-action">
              {activeTab === "Ordonnance" && <Ordonnance patientId={patient_id} consultationId={consultation_id} />}
              {activeTab === "Rapport" && <Rapport patientId={patient_id} consultationId={consultation_id} />}
            </div>
          </div>

          <div className="video-call-container">
            <div className="video-wrapper">
              <video ref={remoteVideoRef} autoPlay playsInline className="video-feed large" />
              <video ref={localVideoRef} autoPlay playsInline className="video-feed small" />
            </div>

            <div className="call-controls">
              <button onClick={startCall}>📞</button>
              <button onClick={toggleMic} className={isMicOn ? "" : "mic-off"}>
                {isMicOn ? "🎤" : "🔇"}
              </button>
              <button onClick={toggleCam} className={isCamOn ? "" : "cam-off"}>
                {isCamOn ? "📷" : "🚫"}
              </button>
              <button onClick={recording ? stopRecording : startRecording} className={recording ? "recording" : ""}>
                {recording ? "⏹️" : "🔴"}
              </button>
              <button onClick={endCall} className="end-call">
                <img src="https://cdn-icons-png.flaticon.com/512/733/733497.png" alt="End Call" />
              </button>
            </div>

            {videoUrl && (
              <div>
                <h3>Recorded Video</h3>
                <video src={videoUrl} controls className="recorded-video" />
                <button onClick={() => window.open(videoUrl)} download="recording.webm">
                  📥
                </button>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
};

export default ConsultV;
