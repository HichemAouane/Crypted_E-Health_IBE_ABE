import React, { memo } from 'react';
import { useNavigate } from 'react-router-dom';

const Goback = memo(() => {
    const navigate = useNavigate();

    const handleGoBack = () => {
        navigate(-1); // Revenir à la page précédente
    };

    return (
        <div>
            <button onClick={handleGoBack} 
            style={{ fontSize: "30px", color: "white", background: "none", border: "none", cursor: "pointer" ,marginTop: "20px", marginLeft: "20px" , width: "60px"}}>
                 ←
            </button>
        </div>
    );
});

export default Goback;