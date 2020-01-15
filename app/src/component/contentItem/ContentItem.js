import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../dbService/dbService';
import { selectors } from '../../redux/reducer';
import FormEditer from '../../container/FormEditer/FormEditer';


class ContentItem extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
    }

    deletePost = () => {
        const { ID_MENU, postData } = this.props;
        const { loginData, a_updateContent } = this.props;
        const { ID } = postData;
        const data = { ...loginData, ID };

        this.db.deletePost(data)
            .then(() => {
                this.db.updatePostList(ID_MENU, contentList => {
                    a_updateContent({ ID_MENU, contentList });
                })
            })
    }

    onEditPost = () => {
        const { loginData, ID_MENU, postData, a_toToggleEditPost } = this.props;
        const { title, content } = postData;

        console.log(postData.ID)
        this.clickPostID = postData.ID;

        this.FormAddPostData = { title, content, action: 'edit' }
        a_toToggleEditPost(true);
    }

    authorizElems = (postData) => {
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
                    onClick={this.deletePost}
                >
                    Удалить
                </button>
            </>
        )
    }

    render() {
        const { postData, s_statusEditPost, a_toToggleEditPost } = this.props;
        const { ID, title, content, ID_MENU } = postData;
        const { clickPostID } = this;


        if (s_statusEditPost && clickPostID === ID) {
            delete this.clickPostID;
            return (
                <FormEditer
                    postData={postData}
                    ID_MENU={ID_MENU}
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
                    {this.authorizElems(postData)}
                </>
            );
        }

    }
}

const mapStateToProps = state => {
    return {
        loginData: selectors.loginData(state),
        s_statusEditPost: selectors.s_statusEditPost(state),

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
