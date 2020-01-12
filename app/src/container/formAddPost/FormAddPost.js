import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer';
import dbService from '../../dbService/dbService';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';


class FormAddPost extends Component {
    onSaveTitle = e => {
        this.title = e.target.value;
    }

    onSaveContent = e => {
        this.content = e.target.value;
    }

    handleSubmit = (e) => {
        // e.preventDefault();
        const { title, content } = this,
            { loginData, ID_MENU, a_toggleEditContent, menuItem, a_updateContent } = this.props,
            contentData = { title, content, ID_MENU };

        console.log(menuItem);


        const db = new dbService();

        db.addPost({ ...loginData, ...contentData })
            .then(res => {
                db.updatePostList(ID_MENU, (contentList) => {
                    // console.log(contentList)
                    a_updateContent({ ID_MENU, contentList });
                    a_toggleEditContent();
                })

            });
    }


    render() {
        return (
            <div className="editer">
                <input
                    type="text"
                    placeholder="title"
                    onChange={this.onSaveTitle}
                />

                <textarea
                    placeholder="Type content"
                    onChange={this.onSaveContent}>
                </textarea>

                <input
                    type="submit"
                    value="Send"
                    onClick={this.handleSubmit}
                />
            </div>
        );
    }
}



const mapStateToProps = state => {
    console.log(state);
    return ({
        loginData: selectors.loginData(state),
        statusEdit: selectors.a_toggleEditContent(state),
    });
}

const mapDispatchToProps = dispatch => {
    const { a_toggleEditContent, a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_toggleEditContent, a_updateContent };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddPost);