import React from 'react';
import styles from './Menu.module.css';


export const Menu = ({ addingPanel, menuList, stylePos }) => {
    let menuStyles = styles.menu;
    if (stylePos === 'top') menuStyles = `${menuStyles} ${styles.menuInline}`;

    return (
        <nav className={menuStyles}>
            {addingPanel}
            {menuList}
        </nav>
    );
}

