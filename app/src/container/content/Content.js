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
    
    generatePosts = (menuItem, idMenu) => {
        const
            { statusAuthoriz, statusEdit, a_toToggleAddPost } = this.props,
            btnText = statusEdit ? 'Назад' : 'Добавить пост';

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
        // console.log(menuItem)
        return (
            <>
                {
                    statusAuthoriz &&
                    <button onClick={() => this.clickAddPost(idMenu)}>
                        {btnText}
                    </button>
                }
                {
                    statusEdit
                        ? <FormEditer
                            menuItem={menuItem}
                            ID_MENU={idMenu}
                            action="add"
                            toBack={() => a_toToggleAddPost(false)}
                        />
                        : content
                }
            </>
        );

    }

    clickAddPost = () => {
        this.props.a_toToggleAddPost(true);
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