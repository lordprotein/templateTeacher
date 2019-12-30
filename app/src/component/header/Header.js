import React from 'react';
import Menu from '../menu/Menu';

const Header = () => {

    return (
        <header className="header">
            <h1 className="header__title">
                title
            </h1>

            <Menu
                position='top'
            />
        </header>
    );
}

export default Header;