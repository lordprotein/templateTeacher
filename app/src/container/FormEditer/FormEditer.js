import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import dbService from '../../dbService/dbService';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';


class FormEditer extends Component {
    onSaveTitle = e => {
        this.title = e.target.value;
    }

    onSaveContent = e => {
        this.content = e.target.value;
    }

    handleSubmit = e => {
        e.preventDefault();

        const { title, content } = this;
        const { s_loginData, a_updateContent, action, postData, toBack } = this.props;


        const db = new dbService();

        const { ID_MENU } = this.props;

        switch (action) {
            case 'add': {
                const data = { ...s_loginData, title, content, ID_MENU }

                db.addPost(data)
                    .then(() => {
                        db.updatePostList(ID_MENU, (contentList) => {
                            a_updateContent({ ID_MENU, contentList });
                        })
                    });
                return;
            }
            case 'edit': {
                const { ID } = postData;
                const data = { ...s_loginData, title, content, ID }

                db.editPost(data)
                    .then(() => {
                        db.updatePostList(ID_MENU, contentList => {
                            a_updateContent({ ID_MENU, contentList });
                            toBack();
                        })
                    })
                return;
            }
            default: break;
        }
    }


    render() {
        const { postData, toBack } = this.props;
        let title = '', content = '';

        if (postData !== undefined) {
            title = postData.title;
            content = postData.content;
        }

        return (
            <div className="editer">
                <input
                    type="text"
                    placeholder="title"
                    onChange={this.onSaveTitle}
                    defaultValue={title}
                />

                <textarea
                    placeholder="Type content"
                    onChange={this.onSaveContent}
                    defaultValue={content}
                >

                </textarea>

                <input
                    type="submit"
                    value="Send"
                    onClick={this.handleSubmit}
                />
                <button
                    onClick={toBack}
                >
                    Назад
                </button>
            </div>
        );
    }
}



const mapStateToProps = state => {
    console.log(state);
    return ({
        s_loginData: selectors.loginData(state),
        s_statusEdit: selectors.s_toggleAddPost(state),
    });
}

const mapDispatchToProps = dispatch => {
    const { a_toggleFormEditer, a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_toggleFormEditer, a_updateContent };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditer);