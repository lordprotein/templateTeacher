import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogInContainer from '../../container/LogIn/LogInContainer';
import { store } from '../../redux/store';
import PageContainer from '../../container/page/PageContainer';


export const withRoutes = WrappedComponent => {
    return class extends Component {
        state = {
            menuList: []
        }

        componentDidMount = () => {
            store.subscribe(() => {
                const menuList = store.getState().api.menu;
                this.setState({ menuList });
            })
        }

        getRoutes = () => {
            const { menuList } = this.state;

            if (!menuList.length) return false;

            const first_route = (
                <Route
                    path='/login'
                    render={() => <LogInContainer />}
                    key={0}
                />
            )

            const home_router = (
                <Route
                    exact
                    path='/'
                    render={() => <PageContainer ID_MENU={menuList[0].ID} titlePage={menuList[0].title} />}
                    key={1}
                />
            )

            const route_list = menuList.map(({ link, ID, title }, key) => {

                return (
                    <Route
                        path={link}
                        render={() => <PageContainer ID_MENU={ID} titlePage={title} />}
                        key={key + 2}
                    />
                );
            });

            return <Switch>{[first_route, home_router, ...route_list]}</Switch>;
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