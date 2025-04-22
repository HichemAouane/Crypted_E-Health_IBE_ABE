import React, { memo } from 'react';

import { useNavigate } from 'react-router-dom';

const Refresh = memo((props) => {
    const navigate = useNavigate();

    const handleRefresh = () => {     
        window.location.reload(); // Rafraîchit la page si on est déjà sur Landing  
    };

    return (
        <a href="#" onClick={handleRefresh} className='person-icon'>
            <img
                src="https://img.freepik.com/free-psd/gradient-abstract-logo_23-2150689644.jpg"
                alt="Retour au menu principal"
            />
        </a>
    );
});



export default Refresh;
