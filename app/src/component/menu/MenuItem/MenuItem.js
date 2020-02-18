import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuItem.module.css';


export const MenuItem = ({ menuItemData, childrens, getAddSubmenuPanel, getButtonsPanel }) => {
    const { title, link } = menuItemData;
    const formAddPanel = getAddSubmenuPanel();
    // console.log(childrens)
    // console.log(link)
    return (
        <div className={styles.menu__item}>
            <Link
                to={link}
                className={styles.menu__link}
            >
                {title}
                {getButtonsPanel()}
            </Link>
            {
                childrens
                    ? (
                        <div className={styles.menu__sub}>
                            {childrens}
                            {formAddPanel && (
                                <div className={styles.menu__item}>
                                    {formAddPanel}
                                </div>
                            )}
                        </div>
                    )
                    :
                    (!childrens && formAddPanel)
                        ? (
                            <div className={styles.menu__sub}>
                                <div className={styles.menu__item}>
                                    {formAddPanel}
                                </div>
                            </div>
                        )
                        :
                        false
            }
        </div >
    );
}

