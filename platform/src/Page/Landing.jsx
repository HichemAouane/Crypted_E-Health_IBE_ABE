import React, { memo, useState } from 'react';
import NavbarProfilP from '../Commun/Navigation/NavbarProfilP';
import NavbarProfilM from '../Commun/Navigation/NavbarProfilM';
import NavbarAvecIcon from "../Commun/Navigation/NavbarAvecIcon";
import SidebarLanding from "../Commun/Navigation/SidebarLanding";
import { FaHeartbeat, FaUserMd, FaUsers, FaClinicMedical } from 'react-icons/fa';

const Landing = memo(() => {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);

    return (
        <div className="landing-container">
            {sessionStorage.getItem("typedecompte") === "Patient" ? (
                <>
                    <NavbarProfilP toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <SidebarLanding isOpen={isSidebarOpen} />
                    <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                        <AboutUsSection />
                    </main>
                </>
            ) : sessionStorage.getItem("typedecompte") === "Medecin" ? (
                <>
                    <NavbarProfilM toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <SidebarLanding isOpen={isSidebarOpen} />
                    <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                        <AboutUsSection />
                    </main>
                </>
            ) : (
                <>
                    <NavbarAvecIcon toggleSidebar={() => setIsSidebarOpen(!isSidebarOpen)} />
                    <SidebarLanding isOpen={isSidebarOpen} />
                    <main className={`main-content ${isSidebarOpen ? "expanded" : "collapsed"}`}>
                        <AboutUsSection />
                    </main>
                </>
            )}
            <style>{`
                .landing-container {
                    display: flex;
                    flex-direction: column;
                    min-height: 100vh;
                }

                .main-content {
                    transition: margin-left 0.3s ease;
                    padding: 2rem;
                    margin-top: 60px;
                }

                .main-content.expanded {
                    margin-left: 250px;
                }

                .main-content.collapsed {
                    margin-left: 80px;
                }

                .about-us-section {
                    max-width: 1200px;
                    margin: 0 auto;
                    color: #333;
                }

                .about-us-header {
                    text-align: center;
                    margin-bottom: 3rem;
                }

                .about-us-header h1 {
                    font-size: 2.5rem;
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .subtitle {
                    font-size: 1.2rem;
                    color: #7f8c8d;
                }

                .about-us-content {
                    display: flex;
                    flex-wrap: wrap;
                    gap: 2rem;
                    margin-bottom: 4rem;
                    align-items: center;
                }

                .about-us-text {
                    flex: 1;
                    min-width: 300px;
                }

                .about-us-text h2 {
                    color: #3498db;
                    margin-bottom: 1rem;
                }
                .team-image {
                    width: 100%;
                    height: auto;
                    object-fit: cover;
                    border-radius: 12px; 
                }
                .about-us-text p {
                    margin-bottom: 1rem;
                    line-height: 1.6;
                }

                .about-us-image {
                    flex: 1;
                    min-width: 300px;
                }

                .image-placeholder {
                    background-color: #f1f2f6;
                    border-radius: 10px;
                    height: 350px;
                    display: flex;
                    align-items: center;
                    justify-content: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
                }

                .placeholder-text {
                    color: #7f8c8d;
                    font-size: 1.2rem;
                }

                .features-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
                    gap: 2rem;
                    margin-bottom: 4rem;
                }

                .feature-card {
                    background: white;
                    border-radius: 10px;
                    padding: 2rem;
                    text-align: center;
                    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.05);
                    transition: transform 0.3s ease, box-shadow 0.3s ease;
                }

                .feature-card:hover {
                    transform: translateY(-5px);
                    box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
                }

                .feature-icon {
                    font-size: 2.5rem;
                    color: #3498db;
                    margin-bottom: 1rem;
                }

                .feature-card h3 {
                    color: #2c3e50;
                    margin-bottom: 0.5rem;
                }

                .feature-card p {
                    color: #7f8c8d;
                    font-size: 0.9rem;
                }

                .stats-section {
                    display: flex;
                    justify-content: space-around;
                    flex-wrap: wrap;
                    background: linear-gradient(135deg, #3498db, #2c3e50);
                    color: white;
                    padding: 3rem 1rem;
                    border-radius: 10px;
                    margin-top: 2rem;
                }

                .stat-item {
                    text-align: center;
                    padding: 1rem;
                    min-width: 150px;
                }

                .stat-number {
                    font-size: 2.5rem;
                    font-weight: bold;
                    margin-bottom: 0.5rem;
                }

                .stat-label {
                    font-size: 1rem;
                    opacity: 0.9;
                }

                @media (max-width: 768px) {
                    .main-content.expanded, .main-content.collapsed {
                        margin-left: 0;
                        padding: 1rem;
                    }

                    .about-us-content {
                        flex-direction: column;
                    }

                    .stats-section {
                        flex-direction: column;
                        gap: 2rem;
                    }
                }
            `}</style>
        </div>
    );
});

const AboutUsSection = () => {
    return (
        <section className="about-us-section">
            <div className="about-us-header">
                <h1>Qui sommes nous ?</h1>
                <p className="subtitle">Votre santé, notre priorité</p>
            </div>

            <div className="about-us-content">
                <div className="about-us-text">
                    <h2>Notre Mission</h2>
                    <p>
                        Nous sommes une plateforme dédiée à faciliter la connexion entre patients et médecins.
                        Notre objectif est de rendre les soins de santé plus accessibles, plus efficaces et plus
                        personnalisés pour tous.
                    </p>
                    <p>
                        Fondée en 2025, notre équipe de professionnels de la santé et de technologues travaille
                        sans relâche pour améliorer votre expérience médicale.
                    </p>
                </div>

                <div className="about-us-image">
                    <img src="/logo.png" alt="Image de l'équipe" className="team-image" />
                </div>

            </div>

            <div className="features-grid">
                <div className="feature-card">
                    <div className="feature-icon">
                        <FaHeartbeat />
                    </div>
                    <h3>Soins Personnalisés</h3>
                    <p>Des solutions de santé adaptées à vos besoins spécifiques.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <FaUserMd />
                    </div>
                    <h3>Professionnels Qualifiés</h3>
                    <p>Accédez à un réseau de médecins certifiés et expérimentés.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <FaUsers />
                    </div>
                    <h3>Communauté</h3>
                    <p>Rejoignez une communauté engagée pour votre bien-être.</p>
                </div>

                <div className="feature-card">
                    <div className="feature-icon">
                        <FaClinicMedical />
                    </div>
                    <h3>Innovation</h3>
                    <p>Des outils modernes pour une meilleure expérience de soins.</p>
                </div>
            </div>

            <div className="stats-section">
                <div className="stat-item">
                    <div className="stat-number">500+</div>
                    <div className="stat-label">Médecins partenaires</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">10K+</div>
                    <div className="stat-label">Patients satisfaits</div>
                </div>
                <div className="stat-item">
                    <div className="stat-number">95%</div>
                    <div className="stat-label">Taux de satisfaction</div>
                </div>
            </div>
        </section>
    );
};

export default Landing;
