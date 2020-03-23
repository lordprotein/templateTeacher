const db = require('./db');

const Login = () => {

}

Login.authorization = (body, result) => {
    const { login, password } = body;

    db.query('SELECT * FROM users WHERE login=? AND password=?', [login, password], (err, user) => {
        if (err) {
            return result(err, null);
        }

        if (user.length) {
            return result(null, { ID: user[0].ID });
        }
        return result(null, { status: 'haven\'t users with this login and password' });
    });
}

module.exports = Login;