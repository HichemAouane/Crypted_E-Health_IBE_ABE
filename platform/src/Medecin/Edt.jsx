import React, { memo } from 'react';
import PropTypes from 'prop-types';
import NavbarProfilM from '../Commun/Navigation/NavbarProfilM';
import Goback from '../Commun/Goback';

const Edt = memo((props) => {
    return (
        <div>
            <NavbarProfilM />
            <Goback />
        </div>
    );
});



export default Edt;