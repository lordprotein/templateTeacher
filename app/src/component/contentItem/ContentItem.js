import React from 'react';

const ContentItem = ({ ID, title, content, login, deletePost }) => {
    return (
        <>
            <h2 className="conten__title">{title}</h2>
            <p className="content__text">
                {content}
            </p>
            {login && (
                <>
                    <button>Редактироватьй</button>
                    <button onClick={() => deletePost(ID)}>Удалить</button>
                </>
            )}
        </>
    );
}

export default ContentItem;
