const db = require('./db');

const File = () => {

}

File.fileList = (req, result) => {
    const { postId } = req.params;

    db.query('SELECT * FROM path_files WHERE ID_CONTENT=?', postId, (err, res) => {
        if (err) return result(err, null);

        if (result.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    })
}


File.fileListWithType = (req, result) => {
    const { postId, fileType } = req.params;

    db.query('SELECT * FROM path_files WHERE ID_CONTENT=? AND type=?', [postId, fileType], (err, res) => {
        if (err) return result(err, null);

        if (result.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    })
}


File.delete = (body, result) => {
    const fs = require('fs');
    const { path, ID } = body

    fs.unlink(path, err => {
        if (err) throw err;

        db.query('DELETE FROM path_files WHERE ID=?', ID, (err, res) => {
            if (err) return result(err, null);

            result(null, { result: res });
        });
    })
}


File.create = (req, result) => {
    const file = req.file;

    if (!file) throw new Error('Document error');

    const { postId } = req.params,
        { filename, path } = req.file,
        { type } = req.body;

    db.query('INSERT INTO path_files ( ID_CONTENT, name, path, type) VALUES ( ?, ?, ?, ?)', [postId, filename, path, type], (err, res) => {
        if (err) {
            const fs = require('fs');
            fs.unlink(path, err => {
                if (err) return result(err, null);
            })
            return result(err, null);
        }

        result(null, { filename, path });
    });
}


module.exports = File;