import React from 'react';
import Menu from '../menu/Menu';

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