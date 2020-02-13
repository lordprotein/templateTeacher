import React from 'react';
import { withRoutes } from '../../../Hoc/withLogIn/withRoutes';

const PageList = ({ getPostList }) => {
    console.log(2)
    return (
        <>
            {getPostList()}
        </>
    );
}

export const PageListWithRoutes = withRoutes(PageList);
