import React, { memo } from 'react';
import { useNavigate ,Link} from 'react-router-dom';
import Navbar from '../Commun/Navigation/Navbar';
import PropTypes from 'prop-types';
import Contacts from '../Commun/Contacts';
import '../Commun/Somecssforall.css';

const Aboutus = memo((props) => {
    return (
        <div>
            <Navbar/>
                <div className='The-body-part'>

                </div>
            <Contacts/>
        </div>
    );
});

Aboutus.propTypes = {
    
};

export default Aboutus;