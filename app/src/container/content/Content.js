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

    getAllRoutes() {
        const { menuList } = this.props;

        if (!menuList.length) return false;

        return menuList.map(({ link, postList, ID }, key) => {
            return (
                <Route
                    path={link}
                    render={() => this.getListPosts(postList, ID)}
                    key={key}
                />
            );
        });
    }

    onAddPost = () => {
        this.props.a_toToggleAddPost(true);
    }

    getFormEditer = (ID_MENU) => {
        return (
            <FormEditer
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

    getListPosts = (menuItem, ID_MENU) => {
        const { statusAuthoriz, statusEdit } = this.props;

        const content_list = menuItem.map((postItem, key) => {
            return (
                <ContentItem
                    postItem={postItem}
                    ID_MENU={ID_MENU}
                    key={key}
                />
            )
        });


        return (
            <>
                {(statusAuthoriz && !statusEdit) ? this.getBtnAddPost() : false}
                {!statusEdit ? content_list : this.getFormEditer()}
            </>
        );

    }


    render() {
        return (
            <section className="content">
                <>
                    <h1>Upload file</h1>
                    <form action="http://77.222.63.195:3333/upload" method="post" enctype="multipart/form-data">
                        <label>Файл</label>
                        <input type="file" name="filedata" />
                        <input type="submit" value="Send" />
                    </form>
                </>

                <Switch>
                    {/* <Route exact path='/' render={() => <Te />} />  */}
                    <Route path='/authorization' render={() => <Authorization />} />
                    {this.getAllRoutes()}
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

// const Te = () => {
//     return <div>Hello!</div>;
// }

export default connect(mapStateToProps, mapDispatchToProps)(Content);