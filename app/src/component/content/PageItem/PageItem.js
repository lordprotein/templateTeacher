import React from 'react';


export const PageItem = ({ children, title, content }) => {

    return (
        <div>
            <h2 className="conten__title">{title}</h2>
            <p className="content__text">
                {content}
            </p>
            {children}
        </div>
    )
}

