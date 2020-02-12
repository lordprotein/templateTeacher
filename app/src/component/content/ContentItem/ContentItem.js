import React from 'react';


export const ContentItem = ({ postData, getControlButtons }) => {
    const { title, content, ID } = postData;

    return (
        <>
            <h2 className="conten__title">{title}</h2>
            <p className="content__text">
                {content}
            </p>
            {getControlButtons(ID)}
        </>
    )
}

