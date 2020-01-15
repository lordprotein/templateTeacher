import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer'
import ContentItem from '../../component/contentItem/ContentItem';
import Authorization from '../authorization/Authorization';
import FormEditer from '../FormEditer/FormEditer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../dbService/dbService';


class Content extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
    }

    get createRoute() {
        const { menuList } = this.props;

        if (!menuList.length) return false;

        return menuList.map(({ link, postList, ID }, key) => {
            return (
                <Route
                    path={link}
                    render={() => this.generatePosts(postList, ID)}
                    key={key}
                />
            );
        });
    }

    clickAddPost = () => {
        this.props.a_toToggleAddPost(true);
    }

    generatePosts = (menuItem, idMenu) => {
        const { statusAuthoriz, statusEdit } = this.props;

        const content = menuItem.map((post, key) => {
            return (
                <ContentItem
                    postData={post}
                    statusAuthoriz={statusAuthoriz}
                    ID_MENU={idMenu}
                    key={key}
                />
            )
        });

        const FormEditerContainer = (
            <FormEditer
                ID_MENU={idMenu}
                action="add"
            />
        )

        return (
            <>
                {
                    statusAuthoriz && !statusEdit &&
                    <button onClick={this.clickAddPost}>
                        Добавить пост
                    </button>
                }
                {statusEdit ? FormEditerContainer : content}
            </>
        );

    }




    render() {
        return (
            <section className="content">
                <Switch>
                    <Route exact path='/' render={() => <Te />} />
                    <Route path='/authorization' render={() => <Authorization />} />
                    {this.createRoute}
                </Switch>
            </section>
        );
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

const Te = () => {
    return <div>Hello!</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);