import React from 'react';
import Menu from '../../container/menu/Menu';

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