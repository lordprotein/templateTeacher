import React, { Component } from 'react';
import { Route, Switch } from 'react-router-dom';
import LogInContainer from '../../container/LogIn/LogInContainer';
import { store } from '../../redux/store';
import PageContainer from '../../container/page/PageContainer';
import SettingsListContainer from '../../container/settings/SettingsListContainer/SettingsListContainer';
import { withLogIn } from './withLogIn';
const SettingsListContainerWithLogin = withLogIn(SettingsListContainer);


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

            const first_route = (
                <Route
                    path='/login'
                    render={() => <LogInContainer />}
                    key={0}
                />
            )

            const settings_router = (
                <Route
                    exact
                    path='/settings'
                    render={() => <SettingsListContainerWithLogin />}
                    key={2}
                />
            )

            if (!menuList.length) return <Switch>{[first_route, settings_router]}</Switch>

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
                        key={key + 3}
                    />
                );
            });

            return <Switch>{[first_route, home_router, settings_router, ...route_list]}</Switch>;
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