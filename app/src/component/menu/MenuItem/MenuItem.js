import React from 'react';
import { Link } from 'react-router-dom';
import styles from './MenuItem.module.css';
import PositionControlContainer from '../../../container/PositionControlContainer/PositionControlContainer';


export const MenuItem = ({ menuItemData, childrens, getAddSubmenuPanel, getButtonsPanel }) => {
    const { title, link, position, ID } = menuItemData;
    const formAddPanel = getAddSubmenuPanel();

    const itemStyle = position !== 'top' ? (`${styles.item}`) : (`${styles.item} ${styles.item_line}`);
    const linkStyle = position !== 'top' ? styles.link : (`${styles.link} ${styles.link_line} ${styles.arrowDown}`);
    const subStyle = position !== 'top' ? styles.sub : (`${styles.sub} ${styles.sub_line}`);

    return (
        <div className={itemStyle}>
            <Link
                to={link}
                className={linkStyle}
            >
                {title}
                <PositionControlContainer
                    itemID={ID}
                    itemName="menu"
                />
                <div className={styles.btnPanel}>
                    {getButtonsPanel()}
                </div>
            </Link>
            {
                childrens
                    ? (
                        <div className={subStyle}>
                            {childrens}
                            {formAddPanel && (
                                <div className={styles.item}>
                                    {formAddPanel}
                                </div>
                            )}
                        </div>
                    )
                    :
                    (!childrens && formAddPanel)
                        ? (
                            <div className={subStyle}>
                                <div className={styles.item}>
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

