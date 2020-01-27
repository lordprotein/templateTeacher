import React from 'react';
import Menu from '../../container/menu/MenuContainer';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <Menu
                position='left'
            />
        </aside>
    );
}

export default Sidebar;