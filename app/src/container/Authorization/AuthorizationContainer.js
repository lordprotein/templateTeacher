import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
// import selectors from '../../redux/reducer';
import dbService from '../../service/service';



class AuthorizationContainer extends Component {

    onSaveLogin = e => {
        return this.login = e.target.value;
    }

    onSavePassword = e => {
        return this.password = e.target.value;
    }

    handleSubmit = (e) => {
        e.preventDefault();

        const { login, password } = this,
            data = { login, password },
            db = new dbService();

        db.checkLogin(data)
            .then(({ access }) => {
                if (access) return this.props.a_setLogIn(data);
            });
    }

    render() {
        return (
            <form>
                <label>
                    Логин
                    <input
                        type="text"
                        name="auth-login"
                        defaultValue="admin"
                        onChange={this.onSaveLogin}
                    />
                </label>
                <label>
                    Пароль
                    <input
                        type="text"
                        name="auth-password"
                        defaultValue="1234"
                        onChange={this.onSavePassword}
                    />
                </label>
                <input type="submit" value="Submit" onClick={this.handleSubmit} />
            </form >
        );
    }
}

const mapStateToProps = state => {
    console.log(state.logIn);
}

const mapDispatchToProps = dispatch => {
    const { a_setLogIn } = bindActionCreators(actions, dispatch);
    return { a_setLogIn };
}

export default connect(mapStateToProps, mapDispatchToProps)(AuthorizationContainer);