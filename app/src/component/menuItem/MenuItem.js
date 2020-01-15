import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ title, link, removeAllModes }) => {


    return (
        <Link to={link} className="menu__link" onClick={removeAllModes}>
            {title}
        </Link>
    );
}



export default MenuItem;