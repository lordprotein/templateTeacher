import React from 'react';


export const ContentItem = ({ title, content, getControlPanel }) => {
    return (
        <>
            <h2 className="conten__title">{title}</h2>
            <p className="content__text">
                {content}
            </p>
            {getControlPanel()}
        </>
    );
}

