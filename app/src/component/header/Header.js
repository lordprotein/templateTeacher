import React from 'react';
import Menu from '../menu/Menu';

const Header = ({ elems, titlePage }) => {

    return (
        <header className="header">
            <h1 className="header__title">
                {titlePage}
            </h1>

            <Menu elems={elems} />

        </header>
    );
}

export default Header;