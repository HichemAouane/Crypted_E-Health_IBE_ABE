# 🔐 Mise en œuvre de IBE et ABE dans une Plateforme de E-Santé

Projet universitaire — Cryptographie 2024/2025

---

## 💡 Présentation

Dans le cadre de ce projet, nous avons développé une **plateforme de e-santé** intégrant des mécanismes de chiffrement avancés pour garantir la sécurité des données médicales des patients.

Deux techniques cryptographiques ont été mises en œuvre :

- 🏷️ **IBE — Identity-Based Encryption**
- 🎯 **ABE — Attribute-Based Encryption**

Elles assurent une sécurité renforcée et un contrôle d’accès fin selon le rôle et l'identité des utilisateurs.

---

## 🔏 Le Chiffrement

### ABE — Attribute-Based Encryption

Le chiffrement basé sur les attributs permet de restreindre l’accès aux données selon des politiques précises (rôle de l’utilisateur, attributs définis).  
➡️ Idéal pour gérer l’accès aux rendez-vous, ordonnances, rapports médicaux.

### IBE — Identity-Based Encryption

L’IBE simplifie la gestion des clés en utilisant une identité unique (comme une adresse mail) comme clé publique.  
➡️ Utile pour la sécurisation des informations utilisateur dès l’inscription.

---

## 💻 Plateforme E-Santé

Fonctionnalités principales :

- 💉 Prise de rendez-vous médicale en ligne.
- 🗓️ Gestion des consultations et historiques.
- 📄 Rédaction d’ordonnances et rapports post-consultation.
- 🔐 Sécurisation des échanges via IBE & ABE.

---

## 🧰 Technologies utilisées

- Python
- Charm Crypto
- React JS
- Flask
- MongoDB
- Node.js
- Visual Studio Code
- WSL (Windows Subsystem for Linux)

---

## ⚙️ Installation & Lancement

### Prérequis :

- Python
- Node.js
- MongoDB
- Flask
- Charm Crypto
- Système Linux ou WSL

### Étapes :

1. Lancer le backend Flask :

```bash
python flask-1.py
```

2. Démarrer le frontend React :

```bash
npm start
```

3. La plateforme sera accessible via votre navigateur.

---

## 🔒 Sécurité et Architecture

- **IBE (Boneh-Franklin)** utilisé pour chiffrer les données utilisateur à l’inscription.
- **ABE (Bethencourt, Sahai, Waters CP-ABE)** utilisé pour contrôler l’accès aux informations médicales selon les rôles.

Exemples de politique ABE :

```
(email == "medecin@hopital.com") OR (role == "radiologue")
```

---

## 🏁 Conclusion

Cette plateforme e-santé intègre des solutions cryptographiques modernes permettant de sécuriser efficacement les données médicales, tout en offrant une gestion flexible et granulaire des accès selon le profil des utilisateurs.

---

## 💼 Licence

Ce projet a été réalisé dans un cadre pédagogique et peut être librement adapté sous une licence open-source à définir.
