import React from 'react';
import MenuItem from '../menuItem/MenuItem';

const Menu = ({ elems }) => {

    return (
        <nav className="menu menu--line">
            {
                renderElems(elems)
            }
        </nav>
    );
}

const renderElems = (elems) => {
    return elems.map((item, key) => {
        return (
            <MenuItem
                title={item.title}
                link={item.link}
                key={key}
            />
        )
    });
}

export default Menu;