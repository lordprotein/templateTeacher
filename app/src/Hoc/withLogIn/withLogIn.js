import React, { Component } from 'react';
import { store } from '../../redux/store';

export const withLogIn = WrappedComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLogged: store.getState().isLogged.status
            }
            this.reduxSubscribe(this.updateStatus);
        }

        reduxSubscribe = () => store.subscribe(this.updateStatus);

        updateStatus = () => {
            const isLogedRedux = store.getState().isLogged.status;
            const { isLogged } = this.state;

            if (isLogedRedux === isLogged) return;

            this.setState({ isLogged: isLogedRedux });
        }

        checkLogin = () => {
            const { isLogged } = this.state;
            if (!isLogged) return false;

            return true;
        }

        render() {
            return this.checkLogin() && < WrappedComponent {...this.props} />
        }
    }
}