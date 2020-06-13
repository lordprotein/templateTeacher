import React from 'react';
import styles from './Menu.module.css';
import {Link} from 'react-router-dom';

export const Menu = ({ children, stylePos }) => {
    let menuStyles = styles.menu;
    let titleStyles;
    if (stylePos === 'top') {
        menuStyles = `${menuStyles} ${styles.menuInline}`;
    }
    if (stylePos === 'left') {
        titleStyles = (
            <>
                <Link to={'/settings'}>Настройки</Link>
                <h2 className={styles.title}>Главное меню</h2>
            </>
        );

    }

    return (
        <nav className={menuStyles}>
            {titleStyles}
            {children}
        </nav>
    );
}

