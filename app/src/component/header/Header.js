import React from 'react';
import MenuContainer from '../../container/menu/MenuContainer';
import styles from './Header.module.css';


const Header = ({ title, imgLink }) => {
    return (
        <>
            {
                imgLink && (
                    <div className={styles.imgWrap}>
                        <img src={imgLink} alt="banner" className={styles.img} />
                    </div>
                )
            }

            <header className={styles.header}>
                <h1 className={styles.title}>{title}</h1>
                <MenuContainer
                    position='top'
                />
            </header>
        </>
    );
}

export default Header;