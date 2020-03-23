const db = require('./db');

const Settings = () => {

}

Settings.getSetting = (req, result) => {
    const { name } = req.params;

    db.query('SELECT ID, value FROM settings WHERE name=?', name, (err, res) => {
        if (err) return result(err, null);

        if (result.length) return result(null, res[0]);

        result({ kind: 'not_found' }, null);
    })
}

Settings.update = (req, result) => {
    const { name, value } = req;

    db.query('UPDATE settings SET value=? WHERE name=?', [value, name], (err, res) => {
        if (err) return result(err, null);

        if (result.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    })
}

Settings.updateImage = (req, result) => {
    const { path } = req.file;
    db.query('SELECT * FROM settings WHERE name=?', 'main_image', (err, res) => {
        if (err) return result(err, null);
        console.log(res)
        if (res.length) {
            const fs = require('fs');
            
            if (!res[0].value) return;

            fs.unlink(res[0].value, err => {
                if (err) throw err;
            })
        }

    })

    db.query('UPDATE settings SET value=? WHERE name=?', [path, 'main_image'], (err, res) => {
        if (err) return result(err, null);

        if (res) return result(null, path);
    })
}


module.exports = Settings;