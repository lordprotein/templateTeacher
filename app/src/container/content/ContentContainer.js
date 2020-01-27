import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer'
import ContentItemContainer from './ContentItemContainer';
import FormEditerContainer from '../FormEditer/FormEditerContainer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import LogInContainer from '../LogIn/LogInContainer';
import { Content } from '../../component/content/Content/Content';


class ContentContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
    }

    getListPosts = (menuItem, ID_MENU) => {
        const { statusAuthoriz, statusEdit } = this.props;

        const content_list = menuItem.map((postItem, key) => {
            return (
                <ContentItemContainer
                    postItem={postItem}
                    ID_MENU={ID_MENU}
                    key={key}
                />
            )
        });


        return (
            <>
                {(statusAuthoriz && !statusEdit) ? this.getBtnAddPost() : false}
                {!statusEdit ? content_list : this.getFormEditer(ID_MENU)}
            </>
        );

    }

    getAllRoutes() {
        const { menuList } = this.props;

        if (!menuList.length) return false;

        const first_route = (
            <Route
                path='/login'
                render={() => <LogInContainer />}
                key={0}
            />
        )

        const route_list = menuList.map(({ link, postList, ID }, key) => {
            return (
                <Route
                    path={link}
                    render={() => this.getListPosts(postList, ID + 1)}
                    key={key}
                />
            );
        });

        return (<Switch>{[first_route, ...route_list]}</Switch>);
    }

    onAddPost = () => {
        this.props.a_toToggleAddPost(true);
    }

    getFormEditer = (ID_MENU) => {
        return (
            <FormEditerContainer
                ID_MENU={ID_MENU}
                action="add"
            />
        );
    }

    getBtnAddPost = () => {
        return (
            <button onClick={this.onAddPost}>
                Добавить пост
            </button>
        );
    }




    render() {
        return (<Content allRoutes={() => this.getAllRoutes()} />);
    }
}




const mapStateToProps = state => {
    return {
        menuList: selectors.menuList(state),
        loginData: selectors.loginData(state),
        statusAuthoriz: selectors.statusAuthoriz(state),
        statusEdit: selectors.s_toggleAddPost(state),

    }
}

const mapDispatchToProps = dispatch => {
    const { a_toToggleAddPost, a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_toToggleAddPost, a_updateContent };
}

// const Te = () => {
//     return <div>Hello!</div>;
// }

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);