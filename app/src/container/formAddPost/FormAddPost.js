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
            { loginData, ID_MENU, toggleEditContent, menuItem } = this.props,
            contentData = { title, content, ID_MENU };

        console.log(menuItem);


        const db = new dbService();

        db.addPost({ ...loginData, ...contentData })
            .then(res => {
                toggleEditContent();
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
        statusEdit: selectors.toggleEditContent(state),
    });
}

const mapDispatchToProps = dispatch => {
    const { toggleEditContent } = bindActionCreators(actions, dispatch);
    return { toggleEditContent };
}

export default connect(mapStateToProps, mapDispatchToProps)(FormAddPost);