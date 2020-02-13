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
            editPostId: null,
            postList: [],
        }
    }

    componentDidMount = () => {
        const { ID_MENU } = this.props;

        this.db.getContentList(ID_MENU)
            .then(res => {
                this.setState(() => {
                    return { postList: res }
                });
            })
    }

    toToggleEdit = isToggle => this.setState({ isEdit: isToggle });

    onEdit = postId => {
        this.toToggleEdit(true);
        this.setState({ editPostId: postId })
    }

    onDeletePost = ID => {
        const { loginData } = this.props;
        const data = { ...loginData, ID };

        // const ask = window.confirm(`Подтвердите удаление`);

        // if (!ask) return;

        this.db.deletePost(data)
            .then(() => {
                this.setState(({ postList }) => {
                    const numDeleteElem = postList.findIndex(elem => elem.ID === ID);
                    const newPostList = [...postList.slice(0, numDeleteElem), ...postList.slice(numDeleteElem + 1)];
                    
                    return { postList: newPostList };
                });
            })
    }

    getControlButtons = postId => {
        return (
            <>
                <ButtonWithLogIn
                    title="Редактировать"
                    onClick={() => this.onEdit(postId)}
                />
                <ButtonWithLogIn
                    title="Удалить"
                    onClick={() => this.onDeletePost(postId)}
                />
            </>
        )
    }


    getPostList = () => {
        const { postList, isEdit } = this.state;
        let { editPostId } = this.state;

        console.log(editPostId);

        return postList.map((postData, key) => {
            if (postData.ID === editPostId && isEdit) {

                return (
                    <FormEditerContainer
                        postData={postData}
                        action="edit"
                        toReset={() => this.toToggleEdit(false)}
                        key={key}
                    />
                );
            }

            return (
                <PageItem
                    postData={postData}
                    getControlButtons={(postId) => this.getControlButtons(postId)}
                    key={key}
                />
            );
        })
    }


    render() {
        return this.getPostList();
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