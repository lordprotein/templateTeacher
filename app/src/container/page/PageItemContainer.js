import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { selectors } from '../../redux/reducer';
import FormEditerContainer from '../FormEditer/FormEditerContainer';
import { PageItem } from '../../component/content/PageItem/PageItem';
import { ButtonWithLogIn } from '../../component/button/Button/Button';
import styles from '../../component/button/Button/Button.module.css';


class PageItemContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
        this.state = {
            isEdit: false,
        }
    }

    toToggleEdit = isToggle => this.setState({ isEdit: isToggle });

    handleDeletePost = () => {
        const { loginData, postData: { ID }, postList, a_updateContent } = this.props;

        const ask = window.confirm(`Подтвердите удаление`);
        if (!ask) return;

        const data = { ...loginData, ID };

        this.db.deletePost(data)
            .then(() => {
                const newPostList = postList.filter(elem => elem.ID !== ID);
                a_updateContent(newPostList);
            });
    }

    render() {
        const { postData, postData: { title, content } } = this.props;
        const { isEdit } = this.state;

        if (isEdit) {
            return (
                <FormEditerContainer
                    postData={postData}
                    action="edit"
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
                        className={styles.edit_post}
                    />
                }
                {
                    <ButtonWithLogIn
                        title="Удалить"
                        onClick={() => this.handleDeletePost()}
                        className={styles.remove_post}
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
        postList: selectors.getPostList(state),

    }
}

const mapDispatchToPros = dispatch => {
    const { a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_updateContent }
}

export default connect(mapStateToProps, mapDispatchToPros)(PageItemContainer);