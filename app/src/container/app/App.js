import React, { Component } from 'react';
import { connect } from 'react-redux';
import Header from '../../component/Header/Header';
import Sidebar from '../../component/Sidebar/Sidebar';
import { selectors } from '../../redux/reducer';
import { PageListWithRoutes } from '../../component/page/PageList/PageList';
import styles from './App.module.css';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { myCookieUser } from '../../service/myCookie';


class App extends Component {
    componentDidMount = () => {
        this._setCookie();
    }

    _setCookie = () => {
        const { a_set_login } = this.props;

        const cookieUser = myCookieUser.get();

        console.log(myCookieUser.get())
        if (cookieUser) a_set_login(true);
    }

    render() {
        const { isLogged } = this.props;

        return (
            <div className={styles.main}>
                <Header isLogIn={isLogged} />
                <div className={styles.wrap}>
                    <Sidebar />
                    <PageListWithRoutes />
                </div>
            </div>
        );
    }
}


const mapStateToProps = state => {
    return {
        isLogged: selectors.isLogged(state)
    };
}

const mapDispatchToProps = dispatch => {
    const { a_set_login } = bindActionCreators(actions, dispatch);

    return { a_set_login };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);