import React, { useState } from 'react';
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP';
import Sidebar from '../Commun/Navigation/Sidebar';
import HTMLtoPDFpatient from './HTMLtoPDFpatient';
import "./popupord.css"

const Ordrecep = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);

  return (
    <div>
      <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebar isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? 'expanded' : 'collapsed'}`}>
                <HTMLtoPDFpatient />
      </main>

    </div>
  );
};

export default Ordrecep;
