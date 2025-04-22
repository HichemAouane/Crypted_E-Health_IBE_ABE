import React, { memo } from 'react';
import PropTypes from 'prop-types';

const Scrolltotop = memo((props) => {
    return (
        <div>
            <button onClick={()=>{window.scrollTo(0, 0)}} id="btnScrollToTop">
     <i class="material-icons">↑</i>
    </button>
   
        </div>

    );
});

Scrolltotop.propTypes = {
    
};

export default Scrolltotop;