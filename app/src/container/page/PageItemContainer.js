import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { selectors } from '../../redux/reducer';
import FormEditerContainer from '../FormEditer/FormEditerContainer';
import { PageItem } from '../../component/content/PageItem/PageItem';
// import { PageItem } from '../../component/content/PageItem/PageItem';
import { ButtonWithLogIn } from '../../component/button/Button/Button';


class PageItemContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
        this.state = {
            isEdit: false,
            title: '',
            content: '',
        }
    }

    componentDidMount = () => {
        const { postData: { title, content } } = this.props;

        this.setState({ title, content })
    }

    toToggleEdit = isToggle => this.setState({ isEdit: isToggle });



    handleDeletePost = () => {
        const { loginData, postData: { ID }, toDeletePost } = this.props;
        const data = { ...loginData, ID };

        const ask = window.confirm(`Подтвердите удаление`);
        if (!ask) return;

        this.db.deletePost(data)
            .then(() => {
                toDeletePost(ID);
            });
    }


    render() {
        const { postData } = this.props;
        const { isEdit, title, content } = this.state;

        if (isEdit) {
            return (
                <FormEditerContainer
                    postData={postData}
                    action="edit"
                    updateData={(title, content) => this.setState({ title, content })}
                    toReset={() => this.toToggleEdit(false)}
                />
            )
        }

        return (
            <PageItem
                postData={postData}
                title={title}
                content={content}
            >
                {
                    <ButtonWithLogIn
                        title="Редактировать"
                        onClick={() => this.toToggleEdit(true)}
                    />
                }
                {
                    <ButtonWithLogIn
                        title="Удалить"
                        onClick={() => this.handleDeletePost()}
                    />
                }
            </PageItem>
        );
    }
}




const mapStateToProps = state => {
    return {
        loginData: selectors.loginData(state),
        isLogIn: selectors.isLogIn(state),
    }
}

const mapDispatchToPros = dispatch => {
    const { a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_updateContent }
}

export default connect(mapStateToProps, mapDispatchToPros)(PageItemContainer);


// getPostList = () => {
    //     const { postList, isEdit } = this.state;
    //     let { editPostId } = this.state;

    //     console.log(editPostId);

    //     return postList.map((postData, key) => {
    //         if (postData.ID === editPostId && isEdit) {

    //             return (
    //                 <FormEditerContainer
    //                     postData={postData}
    //                     action="edit"
    //                     toReset={() => this.toToggleEdit(false)}
    //                     key={key}
    //                 />
    //             );
    //         }

    //         return (
    //             <PageItem
    //                 postData={postData}
    //                 getControlButtons={(postId) => this.getControlButtons(postId)}
    //                 key={key}
    //             />
    //         );
    //     })
    // }