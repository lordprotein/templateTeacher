import React from 'react';
import { Link } from 'react-router-dom';

export const MenuItem = ({ menuItemData, childrens, getAddSubmenuPanel, getButtonsPanel }) => {
    const { title, link } = menuItemData;

    return (
        <div className="menu__item">
            <Link
                to={link}
                className="menu__link"
            >
                {title}
                {getButtonsPanel()}
            </Link>

            <div className="menu__sub">
                {childrens}
                <div className="menu__item">
                    {getAddSubmenuPanel()}
                </div>
            </div>
        </div >
    );
}

