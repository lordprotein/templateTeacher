import React from 'react';
import styles from './LogIn.module.css';
import { useHistory } from 'react-router-dom';


export const LogIn = (props) => {
    const { onChangeInputLogin, onChangeInputPassword, handleSend } = props;
    const history = useHistory();

    return (
        <div className={styles.page}>
            <form className={styles.loginForm}>
                <label className={styles.field}>
                    <h3>Логин</h3>
                    <input
                        type="text"
                        onChange={onChangeInputLogin}
                        placeholder="Логин"
                    />
                </label>
                <label className={styles.field}>
                    <h3>Пароль</h3>
                    <input
                        type="password"
                        onChange={onChangeInputPassword}
                        placeholder="Пароль"
                    />
                </label>
                <input type="submit" value="Войти" onClick={e => handleSend(e, history)} className={styles.btn} />
            </form>
        </div>
    );
}

