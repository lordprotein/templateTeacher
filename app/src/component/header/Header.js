import React from 'react';
import MenuContainer from '../../container/menu/MenuContainer';
import styles from './Header.module.css';


const Header = () => {
    return (
        <header className={styles.header}>
            {/* <h1 className="header__title">
                title
            </h1> */}
            <MenuContainer
                position='top'
            />
        </header>
    );
}

export default Header;