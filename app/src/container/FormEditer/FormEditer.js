import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import dbService from '../../service/service';
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

        const {
            s_loginData, a_removeAllModes, a_updateContent,
            action, postData,
        } = this.props;


        let { title, content } = this;

        if (!title) title = postData.title;
        if (!content) content = postData.content;

        let data = { ...s_loginData, title, content }


        const db = new dbService();

        switch (action) {
            case 'add': {
                const { ID_MENU } = this.props;
                data = { ...data, ID_MENU };
                db.addPost(data)
                    .then(() => {
                        db.updatePostList(ID_MENU, (contentList) => {
                            a_updateContent({ ID_MENU, contentList });
                        })
                    });
                break;
            }
            case 'edit': {
                const { ID_MENU, ID } = postData;
                data = { ...data, ID };
                db.editPost(data)
                    .then(() => {
                        db.updatePostList(ID_MENU, contentList => {
                            a_updateContent({ ID_MENU, contentList });
                        })
                    })
                break;
            }
            default: break;
        }

        a_removeAllModes();
    }


    render() {
        const { postData, a_removeAllModes } = this.props;
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

                <button onClick={a_removeAllModes}>
                    Назад
                </button>
            </div>
        );
    }
}



const mapStateToProps = state => {
    console.log(state.components.Content.modeAddPost, state.components.Content.modeEditPost);
    return ({
        s_loginData: selectors.loginData(state),
        s_statusEdit: selectors.s_toggleAddPost(state),
    });
}

const mapDispatchToProps = dispatch => {
    const { a_updateContent, a_removeAllModes } = bindActionCreators(actions, dispatch);
    return { a_updateContent, a_removeAllModes };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormEditer);