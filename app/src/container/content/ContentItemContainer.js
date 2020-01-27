import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { selectors } from '../../redux/reducer';
import FormEditerContainer from '../FormEditer/FormEditerContainer';


class ContentItem extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
    }

    onDeletePost = () => {
        const { ID_MENU, postItem } = this.props;
        const { loginData, a_updateContent } = this.props;
        const { ID } = postItem;
        const data = { ...loginData, ID };

        const ask = window.confirm(`Подтвердите удаление`);

        if (!ask) return;

        this.db.deletePost(data)
            .then(() => {
                this.db.updatePostList(ID_MENU, contentList => {
                    a_updateContent({ ID_MENU, contentList });
                })
            })
    }

    onEditPost = () => {
        const { postItem, a_toToggleEditPost } = this.props;

        this.currentPostID = postItem.ID;

        a_toToggleEditPost(true);
    }

    authorizElems = (postItem) => {
        const { statusAuthoriz } = this.props;

        if (!statusAuthoriz) return;

        return (
            <>
                <button
                    onClick={this.onEditPost}
                >
                    Редактировать
                </button>
                <button
                    onClick={this.onDeletePost}
                >
                    Удалить
                </button>
            </>
        )
    }

    render() {
        const { s_statusEditPost } = this.props;
        const { postItem, postItem: { ID, title, content } } = this.props;
        const { currentPostID } = this;


        if (s_statusEditPost && currentPostID === ID) {
            delete this.currentPostID;
            return (
                <FormEditerContainer
                    postItem={postItem}
                    action="edit"
                />
            )
        }
        else {
            return (
                <>
                    <h2 className="conten__title">{title}</h2>
                    <p className="content__text">
                        {content}
                    </p>
                    {this.authorizElems(postItem)}
                </>
            );
        }

    }
}

const mapStateToProps = state => {
    return {
        loginData: selectors.loginData(state),
        s_statusEditPost: selectors.s_statusEditPost(state),
        statusAuthoriz: selectors.statusAuthoriz(state),
    }
}

const mapDispatchToPros = dispatch => {
    const { a_updateContent, a_toToggleEditPost } = bindActionCreators(actions, dispatch);

    return {
        a_updateContent,
        a_toToggleEditPost
    }
}

export default connect(mapStateToProps, mapDispatchToPros)(ContentItem);
