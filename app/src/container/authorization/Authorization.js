import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import selectors from '../../redux/reducer';
import dbService from '../../dbService/dbService';



class Authorization extends Component {

    handleSubmit = (e) => {
        e.preventDefault();

        const data = {
            login: document.getElementsByName('auth-login')[0].value,
            password: document.getElementsByName('auth-password')[0].value,
        }
        
        const db = new dbService();
        db.checksLogin(data)
            .then(({access}) => {
                if (access) this.props.a_setLogIn(data);
            })
        // console.log(log, pass)
    }

    render() {


        return (
            <form>
                <label>
                    Логин
                    <input type="text" name="auth-login" defaultValue="admin" />
                </label>
                <label>
                    Пароль
                    <input type="text" name="auth-password" defaultValue="1234" />
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

export default connect(mapStateToProps, mapDispatchToProps)(Authorization);