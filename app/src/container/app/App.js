import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../component/Header/Header';
import ContentContainer from '../content/ContentContainer';
import Sidebar from '../../component/Sidebar/Sidebar';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';


class App extends Component {

    async componentDidMount() {
        const db = new dbService();
        const menuList = await db.generateMenuList();
        this.props.a_updateMenu(menuList);
    }

    render() {
        const { isLogIn } = this.props;

        return (
            <>
                <Header isLogIn={isLogIn} />
                <Sidebar />
                <ContentContainer />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuList: selectors.menuList(state),
        isLogIn: selectors.isLogIn(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    const { a_updateMenu } = bindActionCreators(actions, dispatch);

    return { a_updateMenu };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);