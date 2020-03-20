import React, { Component } from 'react';
import { connect } from 'react-redux';
import Sidebar from '../../component/Sidebar/Sidebar';
import { selectors } from '../../redux/reducer';
import { PageListWithRoutes } from '../../component/page/PageList/PageList';
import styles from './App.module.css';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import { myCookieUser } from '../../service/myCookie';
import HeaderContainer from '../HeaderContainer/HeaderContainer';
import dbService from '../../service/service';


class App extends Component {
    componentDidMount = () => {
        this._setCookie();
        this._setSettings();
    }

    _setCookie = () => {
        const { a_set_login } = this.props;

        const cookieUser = myCookieUser.get();

        console.log(myCookieUser.get())
        if (cookieUser) a_set_login(true);
    }

    _setSettings = () => {
        const db = new dbService();
        const { a_setSettingsSiteName, a_setSettingsMainImg } = this.props;
        db.getSettings('site_name')
            .then(name => {
                a_setSettingsSiteName(name.value);
            });
        db.getSettings('main_image')
            .then(pathImg => {
                a_setSettingsMainImg(pathImg.value);
            })
    }

    render() {
        return (
            <div className={styles.main}>
                <HeaderContainer />
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
        settingsList: selectors.getSettingsList(state),
        state: state.settings
    };
}

const mapDispatchToProps = dispatch => {
    const {
        a_set_login,
        a_setSettingsSiteName,
        a_setSettingsMainImg
    } = bindActionCreators(actions, dispatch);

    return {
        a_set_login,
        a_setSettingsSiteName,
        a_setSettingsMainImg
    };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);