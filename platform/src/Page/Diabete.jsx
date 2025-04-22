import React, { memo, useEffect, useState } from 'react';
import { FaHeartbeat, FaAppleAlt, FaRunning, FaStethoscope } from 'react-icons/fa';
import { useNavigate, Link } from 'react-router-dom';
import Navbar from '../Commun/Navigation/Navbar';
import Contacts from '../Commun/Contacts';

const Diabete = memo(() => {
    const [navbarHeight, setNavbarHeight] = useState(0);

    useEffect(() => {
        const navbar = document.getElementById('navbar');
        if (navbar) {
            setNavbarHeight(navbar.offsetHeight);
        }
    }, []);

    return (
        <>
            <Navbar />
            <div
                className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center px-4 md:px-6 pt-20 pb-12"
                style={{ paddingTop: navbarHeight + 40 }}
            >
                <div className="bg-white shadow-xl rounded-2xl p-6 md:p-8 w-full max-w-4xl mx-4">
                    <h1 className="text-3xl md:text-4xl font-bold text-blue-800 text-center mb-6">
                        <FaStethoscope className="inline-block mr-3 text-blue-600" /> Comprendre le Diabète
                    </h1>
                    <p className="text-gray-700 text-center mb-8 text-lg">
                        Le diabète est une maladie chronique qui affecte la façon dont votre corps traite le sucre dans le sang (glucose).
                        Voici quelques points clés pour le gérer efficacement.
                    </p>

                    {/* Info Cards */}
                    <div className="grid md:grid-cols-2 gap-6">
                        <div className="bg-blue-50 border border-blue-100 p-5 rounded-xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-all duration-300">
                            <FaHeartbeat className="text-red-500 text-3xl mt-1 flex-shrink-0" />
                            <div>
                                <h2 className="text-lg font-semibold text-blue-800">Examens Réguliers</h2>
                                <p className="text-gray-600">Surveillez régulièrement votre taux de glycémie pour rester sur la bonne voie.</p>
                            </div>
                        </div>

                        <div className="bg-green-50 border border-green-100 p-5 rounded-xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-all duration-300">
                            <FaAppleAlt className="text-green-500 text-3xl mt-1 flex-shrink-0" />
                            <div>
                                <h2 className="text-lg font-semibold text-green-800">Alimentation Saine</h2>
                                <p className="text-gray-600">Adoptez une alimentation équilibrée riche en fibres, protéines et pauvre en sucre.</p>
                            </div>
                        </div>

                        <div className="bg-amber-50 border border-amber-100 p-5 rounded-xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-all duration-300">
                            <FaRunning className="text-amber-500 text-3xl mt-1 flex-shrink-0" />
                            <div>
                                <h2 className="text-lg font-semibold text-amber-800">Activité Physique</h2>
                                <p className="text-gray-600">Faites de l'exercice régulièrement pour maintenir un poids santé et améliorer la sensibilité à l'insuline.</p>
                            </div>
                        </div>

                        <div className="bg-purple-50 border border-purple-100 p-5 rounded-xl flex items-start space-x-4 shadow-sm hover:shadow-md transition-all duration-300">
                            <FaStethoscope className="text-purple-500 text-3xl mt-1 flex-shrink-0" />
                            <div>
                                <h2 className="text-lg font-semibold text-purple-800">Suivi Médical</h2>
                                <p className="text-gray-600">Consultez régulièrement votre médecin pour un suivi personnalisé de votre diabète.</p>
                            </div>
                        </div>
                    </div>

                    {/* Learn More Button */}
                    <div className="text-center mt-10">
                        <Link 
                            to="/learn-more" 
                            className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg shadow-md hover:shadow-lg transition-all duration-300 font-medium text-lg"
                        >
                            En Savoir Plus
                        </Link>
                    </div>
                </div>
            </div>
            <Contacts />
        </>
    );
});

export default Diabete;