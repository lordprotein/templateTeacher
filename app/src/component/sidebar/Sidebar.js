import React from 'react';
import MenuContainer from '../../container/menu/MenuContainer';

const Sidebar = () => {
    return (
        <aside className="sidebar">
            <MenuContainer
                position='left'
            />
        </aside>
    );
}

export default Sidebar;