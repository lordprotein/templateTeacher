import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { LogIn } from '../../component/LogIn/LogIn';
import { myCookieUser } from '../../service/myCookie';



class LogInContainer extends Component {
    constructor(props) {
        super(props);
        this.login = '';
        this.password = '';
    }

    onChangeInputLogin = e => {
        return this.login = e.target.value;
    }

    onChangeInputPassword = e => {
        return this.password = e.target.value;
    }

    handleSend = (e, history) => {
        e.preventDefault();

        const { login, password } = this,
            data = { login, password },
            db = new dbService();


        db.loginAuthorization(data)
            .then(({ ID }) => {
                if (!ID) return console.log('Haven\'t this user');

                myCookieUser.set(ID);
                this.props.a_set_login(true);
                history.push('/');

            }, err => console.log(err));
    }

    render() {
        return (
            <LogIn
                onChangeInputLogin={this.onChangeInputLogin}
                onChangeInputPassword={this.onChangeInputPassword}
                handleSend={this.handleSend}
            />
        );
    }
}


const mapDispatchToProps = dispatch => {
    const { a_set_login } = bindActionCreators(actions, dispatch);
    return { a_set_login };
}



export default connect(false, mapDispatchToProps)(LogInContainer);