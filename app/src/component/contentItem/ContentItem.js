import React from 'react';

const ContentItem = ({ postData, statusAuthoriz, deletePost, ID_MENU }) => {
    const { ID, title, content } = postData;
    console.log(`ID menu ${ID_MENU}`)
    return (
        
        <>
            <h2 className="conten__title">{title}</h2>
            <p className="content__text">
                {content}
            </p>
            {statusAuthoriz && (
                <>
                    <button>Редактировать</button>
                    <button onClick={() => deletePost(ID, ID_MENU)}>Удалить</button>
                </>
            )}
        </>
    );
}

export default ContentItem;
