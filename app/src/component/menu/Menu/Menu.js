import React from 'react';
import styles from './Menu.module.css';
import { Link } from 'react-router-dom';
import { withLogIn } from '../../../Hoc/withLogIn/withLogIn';

export const Menu = ({ children, stylePos }) => {
    let menuStyles = styles.menu;
    let titleStyles;

    const LinkToSettings = () => { return <Link to={'/settings'}>Настройки</Link> };
    const Settings = withLogIn(LinkToSettings);

    if (stylePos === 'top') {
        menuStyles = `${menuStyles} ${styles.menuInline}`;
    }

    if (stylePos === 'left') {
        titleStyles = (
            <>
                <Settings />
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

