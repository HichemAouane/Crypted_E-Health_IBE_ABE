import React, { memo } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import PropTypes from 'prop-types';
import Navbar from '../Commun/Navigation/Navbar';
import Contacts from '../Commun/Contacts';
import '../Commun/Somecssforall.css';

const Qsrep = memo((props) => {
    return (
        <>
            <Navbar/>
            <div className='The-body-part'>

            </div>
            <Contacts/>
        </>
    );
});

Qsrep.propTypes = {
    
};

export default Qsrep;