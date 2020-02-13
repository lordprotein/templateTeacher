import React from 'react';
import { withRoutes } from '../../../Hoc/withLogIn/withRoutes';

const PageList = ({ getPostList }) => {
    return (
        <>
            {getPostList()}
        </>
    );
}

export const PageListWithRoutes = withRoutes(PageList);
