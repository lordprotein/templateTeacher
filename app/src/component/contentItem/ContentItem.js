import React from 'react';

const ContentItem = ({ title, content }) => {
    return (
        <>
            <h2 className="conten__title">{title}</h2>
            <p className="content__text">
                {content}
            </p>
        </>
    );
}

export default ContentItem;
