import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer'
import ContentItem from '../../component/contentItem/ContentItem';
import Authorization from '../authorization/Authorization';
import FormAddPost from '../formAddPost/FormAddPost';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../dbService/dbService';


class Content extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
    }

    deletePost = (ID, ID_MENU) => {
        const { loginData, deleteContent } = this.props,
            data = { ...loginData, ID };


        this.db.deletePost(data)
            .then(res => {
                this.db.updatePostList(ID_MENU, contentList => {
                    deleteContent({ ID_MENU, contentList });
                })
            })
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
            { statusAuthoriz, statusEdit } = this.props,
            btnText = statusEdit ? 'Назад' : 'Добавить пост';

        const content = menuItem.map((post, key) => {
            return (
                <ContentItem
                    postData={post}
                    statusAuthoriz={statusAuthoriz}
                    deletePost={(idPost, ID_MENU) => this.deletePost(idPost, ID_MENU)}
                    ID_MENU={idMenu}
                    key={key}
                />
            )
        });


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
                        ? <FormAddPost
                            menuItem={menuItem}
                            ID_MENU={idMenu}
                        />
                        : content
                }
            </>
        );

    }

    clickAddPost = () => {
        this.props.toggleEditContent();
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
        statusAuthoriz: selectors.statusAuthoriz(state),
        statusEdit: selectors.toggleEditContent(state),
        loginData: selectors.loginData(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { toggleEditContent, deleteContent } = bindActionCreators(actions, dispatch);
    return { toggleEditContent, deleteContent };
}

const Te = () => {
    return <div>Hello!</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);