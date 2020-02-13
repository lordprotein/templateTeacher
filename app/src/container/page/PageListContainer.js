import React from 'react';

const PageListContainer = ({ getPostList }) => {
    console.log(2)
    return (
        <>
            {getPostList()}
        </>
    );
}

export default PageListContainer;