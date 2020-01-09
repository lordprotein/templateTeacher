import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Header from '../../component/header/Header';
import Content from '../../component/content/Content';
import Sidebar from '../../component/sidebar/Sidebar';
import dbService from '../../dbService/dbService';
import * as actions from '../../redux/actions';
import { selectors } from '../../redux/reducer';
import toNormalizeLink from '../../component/normalizeLink/normalizeLink';



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

        this.props.getAllMenuData(api);
    }

    render() {
        return (
            <>
                <Header />
                <Sidebar />
                <Content />
            </>
        );
    }
}

const mapStateToProps = (state) => {
    // console.log(state)
    return { menuList: selectors.menuList(state) };
}

const mapDispatchToProps = (dispatch) => {
    const { getAllMenuData } = bindActionCreators(actions, dispatch);

    return { getAllMenuData };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);