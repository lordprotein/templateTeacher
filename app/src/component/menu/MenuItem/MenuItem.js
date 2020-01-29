import React from 'react';
import { Link } from 'react-router-dom';

export const MenuItem = ({ menuItemData, actions, childrens, formAddSubmenu }) => {
    const { title, link } = menuItemData;
    const { onEdit, handleDelete, onAddSubmenu } = actions;
    
    return (
        <div className="menu__item">
            <Link
                to={link}
                className="menu__link"
            >
                {title}
                <button onClick={(e) => onEdit(e)}>Ред</button>
                <button onClick={(e) => handleDelete(e)}>Уд</button>
                <button onClick={(e) => onAddSubmenu(e)}>Подменю</button>
            </Link>

            <div className="menu__sub">
                {childrens}
                <div className="menu__item">
                    {formAddSubmenu()}
                </div>
            </div>
        </div >
    );
}

