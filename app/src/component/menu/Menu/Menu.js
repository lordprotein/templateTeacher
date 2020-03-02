import React from 'react';
import styles from './Menu.module.css';


export const Menu = ({ children, stylePos }) => {
    let menuStyles = styles.menu;
    if (stylePos === 'top') menuStyles = `${menuStyles} ${styles.menuInline}`;

    return (
        <nav className={menuStyles}>
            {children}
        </nav>
    );
}

