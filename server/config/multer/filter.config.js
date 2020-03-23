exports.fileFilter = (req, file, cb) => {
    const db = require('../../models/db');
    const { ID_USER } = req.body;

    db.query('SELECT * FROM users WHERE ID=?', ID_USER, (err, res) => {
        if (err) cb(null, false);

        if (!res.length) cb(null, false);

        cb(null, true)
    })
}