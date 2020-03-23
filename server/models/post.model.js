const db = require('./db');

const Post = () => {

}

Post.postList = (menuId, result) => {
    db.query('SELECT * FROM content WHERE id_menu = ? ORDER BY sequence', menuId, (err, res) => {
        if (err) return result(err, null);

        result(null, res);
    })
}


Post.create = (body, result) => {
    const { title, content, ID_MENU } = body;
    db.query('SELECT * FROM content WHERE ID_MENU=?', ID_MENU, (err, postList) => {
        if (err) return result(err, null);
        const newLength = postList.length + 1;

        db.query('INSERT INTO `content` (title, content, ID_MENU, sequence) VALUES (?, ?, ?, ?)', [title, content, ID_MENU, newLength], (err, res) => {
            if (err) return result(err, null);

            result(null, { result: res });
        });
    })

}


Post.update = (body, result) => {
    const { title, content, ID } = body;
    db.query('UPDATE content SET title=?, content=? WHERE ID=?', [title, content, ID], (err, res) => {
        if (err) return result(err, null);

        result(null, { result: res });
    })
}


Post.delete = (postId, result) => {
    db.query('SELECT * FROM path_files WHERE ID_CONTENT=?', postId, (err, res) => {
        if (err) return result(err, null);

        const length = res.length;

        if (length) {
            const fs = require('fs');
            for (let i = 0; i < length; i++) {
                const path = res[i].path;

                fs.unlink(path, err => {
                    if (err) throw new Error('Files is not deleted');
                });
            }
        }

        db.query('SELECT ID_MENU FROM content WHERE ID=?', postId, (err, MENU_ID) => {
            if (err) return result(err, null);

            MENU_ID = MENU_ID[0].ID_MENU;

            db.query('DELETE FROM content WHERE ID=?', postId, (err) => {
                if (err) return result(err, null);

                db.query('SELECT * FROM content WHERE ID_MENU=?', MENU_ID, (err, postList) => {
                    if (err) return result(err, null);
                    const postListLength = postList.length;
                    for (let i = 0; i < postListLength; i++) {
                        (function () {
                            db.query('UPDATE content SET sequence=? WHERE ID=?', [i + 1, postList[i].ID, postId], (err, res) => {
                                if (err) return result(err, null);
                            })
                        })();

                    }
                    result(null, { result: res });
                });
            })
        })
    })
}

Post.updateSequence = (body, result) => {
    const { current, updated } = body;

    db.query('UPDATE content SET sequence=? WHERE ID=?', [current.sequence, updated.ID], (err, res) => {
        if (err) return result(err, null);


    });

    db.query('UPDATE content SET sequence=? WHERE ID=?', [updated.sequence, current.ID], (err, res) => {
        if (err) return result(err, null);

        result(null, { result: res });
    });
}


module.exports = Post;