import React from 'react';

export const Menu = ({addingPanel, menuList, stylePos}) => {
    return (
        <nav className={stylePos}>
            {addingPanel}
            {menuList}
        </nav>
    );
}

