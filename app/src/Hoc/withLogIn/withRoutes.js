import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogInContainer from '../../container/LogIn/LogInContainer';
// import { Page } from '../../component/content/Page/Page';
// import { PageItem } from '../../component/content/PageItem/PageItem';
import { store } from '../../redux/store';
import PageItemContainer from '../../container/page/PageItemContainer';


export const withRoutes = WrappedComponent => {
    return class extends Component {
        getRoutes() {
            const { menu } = store.getState().api;
            const menuList = menu;

            if (!menuList.length) return false;

            const first_route = (
                <Route
                    path='/login'
                    render={() => <LogInContainer />}
                    key={0}
                />
            )

            const route_list = menuList.map(({ link, ID }, key) => {
                return (
                    <Route
                        path={link}
                        render={() => <PageItemContainer ID_MENU={ID} />}
                        key={key + 1}
                    />
                );
            });

            return <Switch>{[first_route, ...route_list]}</Switch>;
        }

        render() {
            return (
                <WrappedComponent
                    {...this.props}
                    getPostList={() => this.getRoutes()}
                />
            );
        }
    }
}