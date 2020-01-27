import React from 'react';

export const LogIn = (props) => {
    const { onChangeInputLogin, onChangeInputPassword, handleSend } = props;

    return (
        <form>
            <label>
                Логин
                    <input
                    type="text"
                    name="auth-login"
                    defaultValue="admin"
                    onChange={onChangeInputLogin}
                />
            </label>
            <label>
                Пароль
                    <input
                    type="text"
                    name="auth-password"
                    defaultValue="1234"
                    onChange={onChangeInputPassword}
                />
            </label>
            <input type="submit" value="Войти" onClick={handleSend} />
        </form >
    );
}

