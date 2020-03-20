import React from 'react';
import styles from './LogIn.module.css';


export const LogIn = (props) => {
    const { onChangeInputLogin, onChangeInputPassword, handleSend } = props;

    return (
        <form className={styles.loginForm}>
            <label>
                Логин
                    <input
                    type="text"
                    name="username"
                    onChange={onChangeInputLogin}
                />
            </label>
            <label>
                Пароль
                    <input
                    type="password"
                    name="password"
                    onChange={onChangeInputPassword}
                />
            </label>
            <input type="submit" value="Войти" onClick={handleSend} />
        </form >
    );
}

