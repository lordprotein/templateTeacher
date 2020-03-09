import React from 'react';
import styles from './LogIn.module.css';
import dbService from '../../service/service';


export const LogIn = (props) => {
    const { onChangeInputLogin, onChangeInputPassword, handleSend } = props;
    const btn = e => {
        e.preventDefault();
        fetch('http://localhost:3333/word', {
            credentials: 'include',
        })
            .then(res => res.json())
            .then(res => console.log(res));
    }
    return (
        <>
            <form className={styles.loginForm}>
                <button onClick={btn}>click</button>
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
            </form >
            <button onClick={e => handleSend(e)}>Войти</button>
        </>
    );
}

