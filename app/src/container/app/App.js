import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../component/header/Header';
import Content from '../content/Content';
import Sidebar from '../../component/sidebar/Sidebar';
import dbService from '../../dbService/dbService';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import toNormalizeLink from '../../normalizeLink/normalizeLink';



class App extends Component {

    async componentDidMount() {
        const db = new dbService();
        let menuList = await db.getMenuList()
            .then(res => res);

        menuList = menuList.map(async ({ ID, title, position }) => {
            const postList = await db.getContentList(ID);
            return {
                ID,
                title,
                link: `/${toNormalizeLink(title)}`,
                position,
                postList
            }
        })

        const api = await Promise.all(menuList);

        this.props.a_setFetchMenu(api);
    }

    render() {
        const { statusAuthoriz } = this.props;

        return (
            <>
                <Header statusAuthoriz={statusAuthoriz} />
                <Sidebar statusAuthoriz={statusAuthoriz} />
                <Content statusAuthoriz={statusAuthoriz} />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        menuList: selectors.menuList(state),
        statusAuthoriz: selectors.statusAuthoriz(state)
    };
}

const mapDispatchToProps = (dispatch) => {
    const { a_setFetchMenu } = bindActionCreators(actions, dispatch);

    return { a_setFetchMenu };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);