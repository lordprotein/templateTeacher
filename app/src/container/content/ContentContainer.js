import React, { Component } from 'react';
import { Switch, Route } from 'react-router-dom';
import { connect } from 'react-redux';
import { selectors } from '../../redux/reducer'
import ContentItemContainer from './ContentItemContainer';
import FormEditerContainer from '../FormEditer/FormEditerContainer';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import LogInContainer from '../LogIn/LogInContainer';
import { Content } from '../../component/content/Content/Content';
import { ButtonWithLogIn } from '../../component/button/Button/Button';


class ContentContainer extends Component {
    constructor(props) {
        super(props);
        this.db = new dbService();
        this.state = {
            isEdit: false,
        }
    }

    getListPosts = (postList, ID_MENU) => {
        const { isLogIn } = this.props;
        const { isEdit } = this.state;

        const content_list = postList.map((postData, key) => {
            return (
                <ContentItemContainer
                    postData={postData}
                    ID_MENU={ID_MENU}
                    key={key}
                />
            )
        });


        return (
            <>
                {(isLogIn && !isEdit) ? this.getBtnAddPost() : false}
                {!isEdit ? content_list : this.getFormEditer(ID_MENU)}
            </>
        );

    }

    getAllRoutes() {
        const { menuList } = this.props;

        if (!menuList.length) return false;

        const first_route = (
            <Route
                path='/login'
                render={() => <LogInContainer />}
                key={0}
            />
        )

        const route_list = menuList.map(({ link, ID }, key) => {
            return (
                <Route
                    path={link}
                    render={() => <ContentItemContainer ID_MENU={ID} />}
                    key={key + 1}
                />
            );
        });

        return (<Switch>{[first_route, ...route_list]}</Switch>);
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

    getBtnAddPost = () => {
        return (
            <ButtonWithLogIn
                title="Добавить пост"
                onClick={this.setModeAddPost}
            />
        );
    }


    render() {
        return <Content allRoutes={() => this.getAllRoutes()} />;
    }
}




const mapStateToProps = state => {
    return {
        loginData: selectors.loginData(state),
        isLogIn: selectors.isLogIn(state),
    }
}

const mapDispatchToProps = dispatch => {
    const { a_updateContent } = bindActionCreators(actions, dispatch);
    return { a_updateContent };
}

export default connect(mapStateToProps, mapDispatchToProps)(ContentContainer);