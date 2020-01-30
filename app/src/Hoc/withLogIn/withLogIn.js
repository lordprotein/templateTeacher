import React, { Component } from 'react';
import { store } from '../../redux/store';

export const withLogIn = WrappedComponent => {
    return class extends Component {
        constructor(props) {
            super(props);
            this.state = {
                isLogIn: store.getState().logIn.status
            }
            this.reduxSubscribe(this.updateStatus);
        }

        reduxSubscribe = () => store.subscribe(this.updateStatus);

        updateStatus = () => {
            const isLogInRedux = store.getState().logIn.status;
            const { isLogIn } = this.state;

            if (isLogInRedux === isLogIn) return;

            this.setState({ isLogIn: isLogInRedux });
        }

        checkLogin = () => {
            const { isLogIn } = this.state;
            if (!isLogIn) return false;

            return true;
        }

        render() {
            return this.checkLogin() && < WrappedComponent {...this.props} />
        }
    }
}