import React from 'react';


export const Menu = ({ addingPanel, menuList, stylePos }) => (
    <nav className={stylePos}>
        {addingPanel}
        {menuList}
    </nav>
);

