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

    deletePost = (ID) => {
        const { loginData } = this.props;
        const data = { ...loginData, ID };
        console.log(data)
        this.db.deletePost(data)
            .then(res => console.log(res))
    }

    get createRoute() {
        const { menuList } = this.props;

        if (!menuList.length) return false;
        // console.log(menuList)
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
        const { statusAuthoriz, statusEdit } = this.props;

        const content = menuItem.map((post, key) => {
            // console.log(post)
            // const { title, content, ID } = post
            return (
                <ContentItem
                    {...post}
                    {...statusAuthoriz}
                    key={key}
                    deletePost={(idPost) => this.deletePost(idPost)}
                />
            )
        })


        const btnText = statusEdit ? 'Назад' : 'Добавить пост';

        return (
            <>
                {statusAuthoriz && <button onClick={() => this.clickAddPost(idMenu)}>{btnText}</button>}

                {statusEdit ? <FormAddPost menuItem={menuItem} ID_MENU={idMenu} /> : content}
            </>
        );

    }

    clickAddPost = (idMenu) => {
        const { toggleEditContent } = this.props;
        toggleEditContent();
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
    // console.log(selectors.toggleEditContent(state));

    return {
        menuList: selectors.menuList(state),
        statusAuthoriz: selectors.statusAuthoriz(state),
        statusEdit: selectors.toggleEditContent(state),
        loginData: selectors.loginData(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { toggleEditContent } = bindActionCreators(actions, dispatch);
    return { toggleEditContent };
}

const Te = () => {
    return <div>Hello!</div>;
}

export default connect(mapStateToProps, mapDispatchToProps)(Content);