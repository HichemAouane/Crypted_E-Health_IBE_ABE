import React, { memo } from 'react';
import Navbar from '../Commun/Navigation/Navbar';
import Contacts from '../Commun/Contacts';

const Cardio = memo(() => {
    const styles = {
        pageContainer: {
            padding: '20px',
            textAlign: 'center',
            background: '#f4f4f9',
            minHeight: '100vh'
        },
        title: {
            fontSize: '32px',
            fontWeight: 'bold',
            color: '#d9534f',
            marginBottom: '10px'
        },
        subtitle: {
            fontSize: '18px',
            color: '#555',
            marginBottom: '30px'
        },
        contentContainer: {
            maxWidth: '900px',
            margin: 'auto',
            textAlign: 'left',
            background: '#fff',
            padding: '20px',
            borderRadius: '10px',
            boxShadow: '0 4px 10px rgba(0, 0, 0, 0.1)'
        },
        sectionTitle: {
            fontSize: '22px',
            fontWeight: 'bold',
            color: '#d9534f',
            margin: '20px 0 10px'
        },
        paragraph: {
            fontSize: '16px',
            color: '#333',
            lineHeight: '1.6'
        },
        image: {
            width: '100%',
            borderRadius: '8px',
            marginTop: '15px'
        }
    };

    return (
        <>
            <Navbar />
            <div style={styles.pageContainer}>
                <h1 style={styles.title}>Cardiologie Vasculaire</h1>
                <p style={styles.subtitle}>
                    Découvrez les bases de la santé cardiovasculaire et comment prévenir les maladies du cœur.
                </p>

                <div style={styles.contentContainer}>
                    <h2 style={styles.sectionTitle}>Qu'est-ce que la Cardiologie Vasculaire ?</h2>
                    <p style={styles.paragraph}>
                        La cardiologie vasculaire est une branche de la médecine qui étudie le fonctionnement du cœur et des vaisseaux sanguins.
                        Elle joue un rôle essentiel dans la prévention, le diagnostic et le traitement des maladies cardiovasculaires.
                    </p>

                    <img src="/assets/heart-disease.jpg" alt="Illustration du système cardiovasculaire" style={styles.image} />

                    <h2 style={styles.sectionTitle}>Les Maladies Cardiovasculaires les Plus Courantes</h2>
                    <p style={styles.paragraph}>
                        Voici quelques-unes des maladies les plus fréquentes affectant le système cardiovasculaire :
                    </p>
                    <ul style={styles.paragraph}>
                        <li><strong>Hypertension Artérielle :</strong> Une pression sanguine trop élevée qui peut endommager les artères.</li>
                        <li><strong>Infarctus du Myocarde :</strong> Plus connu sous le nom de crise cardiaque, il survient lorsque le flux sanguin vers le cœur est bloqué.</li>
                        <li><strong>Accident Vasculaire Cérébral (AVC) :</strong> Provoqué par une interruption de l'apport sanguin au cerveau.</li>
                        <li><strong>Insuffisance Cardiaque :</strong> Lorsque le cœur ne pompe pas suffisamment de sang pour répondre aux besoins du corps.</li>
                    </ul>

                    <h2 style={styles.sectionTitle}>Prévention et Conseils de Santé</h2>
                    <p style={styles.paragraph}>
                        Pour garder un cœur en bonne santé, voici quelques recommandations essentielles :
                    </p>
                    <ul style={styles.paragraph}>
                        <li>Adoptez une alimentation équilibrée, riche en fruits, légumes et oméga-3.</li>
                        <li>Pratiquez une activité physique régulière (30 minutes par jour).</li>
                        <li>Évitez le tabac et limitez votre consommation d'alcool.</li>
                        <li>Contrôlez régulièrement votre tension artérielle et votre taux de cholestérol.</li>
                        <li>Gérez votre stress grâce à la méditation, le yoga ou d'autres activités relaxantes.</li>
                    </ul>

                    <img src="/assets/healthy-heart.jpg" alt="Conseils pour un cœur en bonne santé" style={styles.image} />
                </div>
            </div>
            <Contacts />
        </>
    );
});

export default Cardio;
