import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';
import Navbar from '../Commun/Navigation/Navbar';
import Contacts from '../Commun/Contacts';

const Partner = memo(() => {
    const navigate = useNavigate();

    const styles = {
        partnerBody: {
            padding: '20px',
            textAlign: 'center',
            background: '#f9f9f9'
        },
        partnerTitle: {
            fontSize: '28px',
            fontWeight: 'bold',
            color: '#007bff',
            marginBottom: '10px'
        },
        partnerDescription: {
            fontSize: '16px',
            color: '#333',
            marginBottom: '30px'
        },
        partnerList: {
            display: 'flex',
            justifyContent: 'center',
            gap: '20px',
            flexWrap: 'wrap'
        },
        partnerCard: {
            background: 'white',
            borderRadius: '10px',
            padding: '10px',
            textAlign: 'center',
            width: '200px',
            cursor: 'pointer',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
            transition: 'transform 0.3s, box-shadow 0.3s'
        },
        partnerCardHover: {
            transform: 'translateY(-5px)',
            boxShadow: '0 6px 12px rgba(0, 0, 0, 0.2)'
        },
        partnerImage: {
            width: '100%',
            height: '120px',
            objectFit: 'cover',
            borderRadius: '8px'
        },
        partnerName: {
            marginTop: '10px',
            fontSize: '16px',
            fontWeight: 'bold',
            color: '#222'
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.partnerBody}>
                <h1 style={styles.partnerTitle}>Nos Partenaires</h1>
                <p style={styles.partnerDescription}>
                    Découvrez nos partenaires qui nous aident à améliorer l'accès aux soins de santé pour tous.
                </p>

                <div style={styles.partnerList}>
                    {['partner1', 'partner2', 'partner3'].map((partner, index) => (
                        <div
                            key={index}
                            style={styles.partnerCard}
                            onMouseEnter={(e) => Object.assign(e.currentTarget.style, styles.partnerCardHover)}
                            onMouseLeave={(e) => Object.assign(e.currentTarget.style, styles.partnerCard)}
                            onClick={() => navigate(`/${partner}`)}
                        >
                            <img src={`/assets/${partner}.jpg`} alt={`Partenaire ${index + 1}`} style={styles.partnerImage} />
                            <p style={styles.partnerName}>Partenaire {index + 1}</p>
                        </div>
                    ))}
                </div>
            </div>
            <Contacts />
        </>
    );
});

export default Partner;
