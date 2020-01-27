import React, { Component } from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../redux/actions';
import dbService from '../../service/service';
import { LogIn } from '../../component/LogIn/LogIn';



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

    handleSend = e => {
        e.preventDefault();

        const { login, password } = this,
            data = { login, password },
            db = new dbService();


        db.checkLogin(data)
            .then(({ access }) => {
                console.log(access)
                if (access) return this.props.a_setLogIn(data);
            });
    }

    render() {
        return (
            <LogIn
                onChangeInputLogin={e => this.onChangeInputLogin(e)}
                onChangeInputPassword={e => this.onChangeInputPassword(e)}
                handleSend={e => this.handleSend(e)}
            />
        );
    }
}


const mapDispatchToProps = dispatch => {
    const { a_setLogIn } = bindActionCreators(actions, dispatch);
    return { a_setLogIn };
}



export default connect(false, mapDispatchToProps)(LogInContainer);