import React from 'react';
import { Link } from 'react-router-dom';

const MenuItem = ({ title, onClickElem, link }) => {


    return (
        <Link to={link} className="menu__link" onClick={onClickElem}>
            {title}
        </Link>
    );
}



export default MenuItem;