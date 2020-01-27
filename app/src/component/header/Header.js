import React from 'react';
import MenuContainer from '../../container/menu/MenuContainer';

const Header = () => {

    return (
        <header className="header">
            <h1 className="header__title">
                title
            </h1>

            <MenuContainer
                position='top'
            />
        </header>
    );
}

export default Header;