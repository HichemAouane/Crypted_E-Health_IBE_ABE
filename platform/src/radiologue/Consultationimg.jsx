import React, { useState } from 'react';
import Sidebarradio from '../Commun/Navigation/Sidebarradio';
import NavbarProfilM from '../Commun/Navigation/NavbarProfilM';

const Consultationimg = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  // Assuming the images are served from the public folder, adjust the path if needed.
  const images = [
    '/img1.jpg',
    '/img2.jpg',
    '/img3.jpg'
  ];
  
  
  // State to control the modal image display.
  const [selectedImage, setSelectedImage] = useState(null);

  // Inline styles for a clean and functional interface.
  const styles = {
    container: {
      padding: '20px',
      margin: '0 auto',
      maxWidth: '1200px',
      textAlign: 'center',
    },
    header: {
      marginBottom: '30px',
      fontSize: '24px',
      fontWeight: 'bold',
      color: '#333',
    },
    gallery: {
      display: 'grid',
      gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))',
      gap: '20px',
      padding: '10px',
    },
    imageCard: {
      border: 'none',
      borderRadius: '10px',
      overflow: 'hidden',
      cursor: 'pointer',
      transition: 'transform 0.3s ease, box-shadow 0.3s ease',
      boxShadow: '0px 4px 10px rgba(0, 0, 0, 0.1)',
    },
    imageCardHover: {
      transform: 'scale(1.05)',
      boxShadow: '0px 6px 15px rgba(0, 0, 0, 0.2)',
    },
    image: {
      width: '100%',
      display: 'block',
      borderRadius: '10px',
      transition: 'opacity 0.3s ease-in-out',
    },
    modal: {
      position: 'fixed',
      top: 0,
      left: 0,
      width: '100vw',
      height: '100vh',
      backgroundColor: 'rgba(0,0,0,0.85)',
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      zIndex: 1000,
      backdropFilter: 'blur(5px)',
    },
    modalContent: {
      position: 'relative',
      maxWidth: '90vw',
      maxHeight: '90vh',
      borderRadius: '10px',
      boxShadow: '0px 0px 15px rgba(255, 255, 255, 0.3)',
    },
    modalImage: {
      width: '100%',
      height: 'auto',
      borderRadius: '10px',
      maxHeight: '90vh',
    },
    closeModal: {
      position: 'absolute',
      top: '15px',
      right: '20px',
      background: '#ff4d4d',
      color: 'white',
      border: 'none',
      padding: '10px 15px',
      fontSize: '18px',
      borderRadius: '50%',
      cursor: 'pointer',
      transition: 'background 0.3s ease-in-out',
    },
    closeModalHover: {
      background: '#ff1a1a',
    },
  };
  

  return (
    <div>
      <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
      <Sidebarradio isOpen={isSidebarOpen} />
      <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
        <div style={styles.container}>
          <header style={styles.header}>
            <h1>Consultation d'Images</h1>
            <p>Visualisation des images radiologiques</p>
          </header>
          
          <section style={styles.gallery}>
            {images.map((img, index) => (
              <div
                key={index}
                style={styles.imageCard}
                onClick={() => setSelectedImage(img)}
                onMouseOver={(e) => e.currentTarget.style.transform = "scale(1.05)"}
                onMouseOut={(e) => e.currentTarget.style.transform = "scale(1)"}
              >
                <img src={img} alt={`Radiologie ${index + 1}`} style={styles.image} />
              </div>
            ))}
          </section>
          
          {/* Modal for enlarged image view */}
          {selectedImage && (
            <div style={styles.modal} onClick={() => setSelectedImage(null)}>
              <div style={styles.modalContent} onClick={(e) => e.stopPropagation()}>
                <img src={selectedImage} alt="Agrandissement" style={styles.modalImage} />
                <button style={styles.closeModal} onClick={() => setSelectedImage(null)}>
                  Fermer
                </button>
              </div>
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default Consultationimg;
