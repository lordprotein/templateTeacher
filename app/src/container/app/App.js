import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../component/Header/Header';
import PageContainer from '../page/PageContainer';
import Sidebar from '../../component/Sidebar/Sidebar';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
import { withRoutes } from '../../Hoc/withLogIn/withRoutes';
import PageListContainer from '../page/PageListContainer';
import { PageListWithRoutes } from '../../component/content/PageList/PageList';


class App extends Component {
    componentDidMount() {
        const db = new dbService();
        const { a_updateMenu } = this.props;

        db.getMenuList()
            .then(res => a_updateMenu(res))
    }

    render() {
        const { isLogIn } = this.props;
        
        return (
            <>
                <Header isLogIn={isLogIn} />
                <Sidebar />
                <PageListWithRoutes />
            </>
        );
    }
}



const mapStateToProps = (state) => {
    return {
        menuList: selectors.getMenuList(state),
        isLogIn: selectors.isLogIn(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    const { a_updateMenu } = bindActionCreators(actions, dispatch);

    return { a_updateMenu };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);