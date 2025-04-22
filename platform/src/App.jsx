import React,{ useEffect ,useState } from "react";
import { Routes, Route, Navigate } from "react-router-dom";

import Choice from "./composents/Authontification/Choice.jsx";
import RoleSelection from './composents/Authontification/RoleSelection.jsx';
import Signup from "./composents/Authontification/Signup.jsx";
import Med from './composents/Authontification/Med';
import Patient from './composents/Authontification/Patient';
import ResetPassword from "./composents/Authontification/ResetPassword.jsx";

import PrincM from "./composents/Medecin/PrincM.jsx";
import Data from "./composents/Medecin/Data.jsx";
import Edt from "./composents/Medecin/Edt.jsx";
import Rdvactuel from "./composents/Medecin/Rdv/Rdvactuel.jsx";
import Rdvactuelrad from "./composents/radiologue/Rdvactuelrad.jsx";
import Rdvrecep from "./composents/Medecin/Rdv/Rdvrecep.jsx";
import Rdvreceprad from "./composents/radiologue/Rdvreceprad.jsx";
import OneRdv from "./composents/Medecin/Rdv/OneRdv.jsx";
import RdvM from "./composents/Medecin/Rdv/RdvM.jsx";
import Profilemed from "./composents/Medecin/Profilemed.jsx";

import Settingsmed from "./composents/Medecin/Settingsmed.jsx";
import AddRdv from "./composents/Medecin/Rdv/AddRdv.jsx";
import ConsultV from "./composents/Medecin/ConsultV.jsx";
import ConsultP from "./composents/Medecin/ConsultP.jsx";

import Cardio from "./composents/Page/Cardio.jsx";
import Diabete from "./composents/Page/Diabete.jsx"
import Landing from "./composents/Page/Landing.jsx";
import Partner from "./composents/Page/Partner.jsx";
import Qsrep from "./composents/Page/Qsrep.jsx";

import PrincP from "./composents/Patient/PrincP.jsx";
import PrincR from "./composents/radiologue/PrincR.jsx";
import Planning from "./composents/Patient/Planning.jsx";
import Rdvacc from "./composents/Patient/Rdvacc.jsx";
import Hist from "./composents/Patient/Hist.jsx";
import RdvP from "./composents/Patient/RdvP.jsx";
import Rdvdem from "./composents/Patient/Rdvdem.jsx";
import RdvStatus from "./composents/Patient/RdvStatus.jsx";
import Profilepat from "./composents/Patient/Profilepat.jsx";
import Settingspat from "./composents/Patient/Settingspat.jsx"
import Ordrecep from "./composents/Patient/Ordrecep.jsx";
import Medoc from "./composents/Patient/Medoc.jsx";

import ChatP from "./composents/Chat/ChatP.jsx";
import ChatM from "./composents/Chat/ChatM.jsx";
import Ordonnance from "./composents/Medecin/Ordonnance.jsx";
import Constante from "./composents/Medecin/Constante.jsx";
import Rapport from "./composents/Medecin/Rapport.jsx";
import ListPat from "./composents/Medecin/ListPat.jsx";
import Datav from "./composents/Medecin/Datav.jsx";
import Info from "./composents/Medecin/Info.jsx";
import SetInfoM from "./composents/Medecin/SetInfoM.jsx";
import Consult from "./composents/Patient/Consult.jsx";
import Consultday from "./composents/Patient/Consultday.jsx";
import InfoP from "./composents/Patient/InfoP.jsx";
import SetInfoP from "./composents/Patient/SetInfoP.jsx";
import ListMedecinOrd from "./composents/Patient/ListMedecinOrd.jsx";
import Consultationimg from "./composents/radiologue/Consultationimg.jsx";
import Compterendue from "./composents/radiologue/Compterendue.jsx";
import Listpationrad from "./composents/radiologue/Listpationrad.jsx";
import Pprofileradio from "./composents/radiologue/Pprofileradio.jsx";


const App = () => {
    const [typeAcc, setTypeAcc] = useState(sessionStorage.getItem("typedecompte"))
    useEffect(() => {
        document.body.className =
        typeAcc === "Patient"
            ? "p-background"
            : typeAcc === "Medecin"
            ? "m-background"
            : "default-background";
      }, [typeAcc]);
    return (
        <div className="App">
            <Routes>
                {/* Route par défaut redirige vers /landing */}
                <Route path="/" element={<Navigate to="/landing" />} />
                {/* Route pour Landing.jsx */}
                <Route path="/landing" element={<Landing />} />
                <Route path="/choice" element={<Choice />} />
                <Route path="/cardio" element={<Cardio />} />
                <Route path="/diabete" element={<Diabete />} />
                <Route path="/partner" element={<Partner />} />
                <Route path="/qsrep" element={<Qsrep />} />
                <Route path="/role-selection" element={<RoleSelection />} />
                <Route path="/Reset-password" element={<ResetPassword />} />
                <Route path="/patient" element={<Patient />} />
                <Route path="/med" element={<Med />} />
                <Route path="/princm" element={<PrincM />} />
                <Route path="/princp" element={<PrincP />} />
                <Route path="/princr" element={<PrincR/>} />
                <Route path="/chatp" element={<ChatP />} />
                <Route path="/chatm" element={<ChatM />} />
                <Route path="/data" element={<Data />} />
                <Route path="/planning" element={<Planning />} />
                <Route path="/Rdvacc" element={<Rdvacc />} />
                <Route path="/hist" element={<Hist />} />
                <Route path="/signup" element={<Signup />} />
                <Route path="/rdvm" element={<RdvM />} />
                <Route path="/rdvrecep" element={<Rdvrecep />} />
                <Route path="/edt" element={<Edt />} />
                <Route path="/rdvactuel" element={<Rdvactuel />} />
                <Route path="/rdvp" element={<RdvP />} />
                <Route path="/rdvdem" element={<Rdvdem />} />
                <Route path="/Profilepat" element={<Profilepat />} />
                <Route path="/Profilemed" element={<Profilemed />} />
                <Route path="/Settingspat" element={<Settingspat />} />
                <Route path="/Settingsmed" element={<Settingsmed />} />
                <Route path="/onerdv" element={<OneRdv />} />
                <Route path="/addrdv" element={<AddRdv />} />
                <Route path="/consultv" element={<ConsultV />} />
                <Route path="/consultp" element={<ConsultP />} />
                <Route path="/rdvstatus" element={<RdvStatus />} />
                <Route path="/ordrecep" element={<Ordrecep />} />
                <Route path="/medoc" element={<Medoc />} />
                <Route path="/constante" element={<Constante />} />
                <Route path="/rapport" element={<Rapport />} />
                <Route path="/ordonnance" element={<Ordonnance />} />
                <Route path="/listpat" element={<ListPat />} />
                <Route path="/listpatradio" element={<Listpationrad />} />
                <Route path="/datav" element={<Datav />} />
                <Route path="/info" element={<Info />} />
                <Route path="/setinfom" element={<SetInfoM />} />
                <Route path="/infop" element={<InfoP />} />
                <Route path="/setinfop" element={<SetInfoP />} />
                <Route path="/consultday" element={<Consultday />} />
                <Route path="/consult" element={<Consult />} />
                <Route path="/Consultationimages" element={<Consultationimg />} />
                <Route path="/Compterendue" element={<Compterendue />} />
                <Route path="/rdvactuelrad" element={<Rdvactuelrad />} />
                <Route path="/rdvreceprad" element={<Rdvreceprad />} />
                <Route path="/infor" element={<Pprofileradio />} />

            </Routes>
        </div>
    );
};


export default App;