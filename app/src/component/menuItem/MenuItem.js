import React from 'react';

const MenuItem = ({link, title}) => {

    return (
        <a href={link} className="menu__link">
            {title}
		</a>
    );
}

export default MenuItem;