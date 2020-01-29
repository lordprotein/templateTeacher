import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { selectors } from '../../redux/reducer';
import FormEditerContainer from '../FormEditer/FormEditerContainer';
import { ContentItem } from '../../component/content/ContentItem/ContentItem';


class ContentItemContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
        this.state = {
            isEdit: false
        }
    }

    toToggleEdit = isToggle => this.setState({ isEdit: isToggle });

    onEdit = () => this.toToggleEdit(true);

    onDeletePost = () => {
        const { ID_MENU, postItem: { ID }, loginData, a_updateContent } = this.props;

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

    getControlPanel = () => {
        const { isLogIn } = this.props;
        if (!isLogIn) return;

        return (
            <>
                <button onClick={this.onEdit}>
                    Редактировать
                </button>
                <button onClick={this.onDeletePost}>
                    Удалить
                </button>
            </>
        )
    }

    render() {
        const { postItem, postItem: { title, content } } = this.props;
        const { isEdit } = this.state;

        if (isEdit) {
            return (
                <FormEditerContainer
                    postData={postItem}
                    action="edit"
                    toReset={() => this.toToggleEdit(false)}
                />
            )
        }

        return (
            <ContentItem
                title={title}
                content={content}
                getControlPanel={() => this.getControlPanel(postItem)}
            />
        );

    }
}

const mapStateToProps = state => {
    return {
        loginData: selectors.loginData(state),
        isLogIn: selectors.statusAuthoriz(state),
    }
}

const mapDispatchToPros = dispatch => {
    const { a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_updateContent }
}

export default connect(mapStateToProps, mapDispatchToPros)(ContentItemContainer);