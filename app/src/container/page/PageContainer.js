import React, { Component } from 'react';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer'
import PageItemContainer from './PageItemContainer';
import FormEditerContainer from '../FormEditer/FormEditerContainer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { Page } from '../../component/content/Page/Page';
import { ButtonWithLogIn } from '../../component/button/Button/Button';


export default class PageContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
        this.state = {
            isEdit: false,
        }
    }

    setModeAddPost = isToggle => this.setState({ isEdit: isToggle });

    getFormEditer = (ID_MENU) => {
        return (
            <FormEditerContainer
                ID_MENU={ID_MENU}
                action="add"
                toReset={() => this.setModeAddPost(false)}
            />
        );
    }

    render() {
        return (
            <Page>
                {
                    <ButtonWithLogIn
                        title="Добавить пост"
                        onClick={this.setModeAddPost}
                    />
                }
                {this.props.getPostList()}
            </Page>
        );
    }
}