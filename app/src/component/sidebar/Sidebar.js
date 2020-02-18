import React from 'react';
import MenuContainer from '../../container/menu/MenuContainer';
import styles from './Sidebar.module.css';


const Sidebar = () => {
    return (
        <aside className={styles.sidebar}>
            <MenuContainer
                position='left'
            />
        </aside>
    );
}

export default Sidebar;