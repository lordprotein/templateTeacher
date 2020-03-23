const db = require('./db');

const CheckAuthorization = () => { };

CheckAuthorization.check = (req, result) => {
    const { ID_USER } = req.body;

    db.query('SELECT * FROM users WHERE ID=?', ID_USER, (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    })
}

module.exports = CheckAuthorization;