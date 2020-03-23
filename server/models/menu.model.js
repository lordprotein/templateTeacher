const db = require('./db');

const Menu = menu => {

}

//GET

Menu.allList = result => {
    db.query('SELECT * FROM menu', (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    })
}


Menu.findById = (menuId, result) => {
    db.query(`SELECT * FROM menu WHERE id=?`, menuId, (err, res) => {
        if (err) return result(err, null);

        if (res.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    })
}


Menu.position = (position, result) => {
    db.query(`SELECT * FROM menu WHERE position=? ORDER BY sequence`, position, (err, res) => {
        if (err) return result(err, null);

        if (result.length) return result(null, res);

        result({ kind: 'not_found' }, null);
    })
}


//END GET


//POST

Menu.create = (req, result) => {
    const { title, position, link } = req.body;
    let { submenu } = req.body;
    if (!submenu) submenu = null;

    const line = submenu === null ? 'SELECT * FROM menu WHERE submenu IS NULL' : 'SELECT * FROM menu WHERE submenu=?';

    db.query(line, submenu, (err, menuList) => {
        if (err) return result(err, null);
        const newLength = menuList.length + 1;

        db.query('INSERT INTO menu (title, position, link, submenu, sequence) VALUES ( ?, ?, ?, ?, ?)', [title, position, link, submenu, newLength], (err, res) => {
            if (err) return result(err, null);

            result(null, { result: res });
        });
    })


}


Menu.update = (req, result) => {
    const { title, ID, link } = req;

    db.query('UPDATE menu SET title=?, link=? WHERE ID=?', [title, link, ID], (err, res) => {
        if (err) return result(err, null);

        result(null, { result: res });
    })
}

Menu.updateSequence = (body, result) => {
    const { current, updated } = body;
    
    db.query('UPDATE menu SET sequence=? WHERE ID=?', [current.sequence, updated.ID], (err, res) => {
        if (err) return result(err, null);
    });

    db.query('UPDATE menu SET sequence=? WHERE ID=?', [updated.sequence, current.ID], (err, res) => {
        if (err) return result(err, null);

        result(null, { result: res });
    });
}

Menu.delete = (menuId, result) => {
    db.query('SELECT submenu FROM menu WHERE ID=?', menuId, (err, submenu) => {
        if (err) return result(err, null);

        submenu = submenu[0].submenu;
        const line = submenu === null ? 'SELECT * FROM menu WHERE submenu IS NULL' : 'SELECT * FROM menu WHERE submenu=?';

        db.query(
            `SELECT path_files.ID, path_files.name, path_files.path FROM ( SELECT * FROM menu WHERE FIND_IN_SET(ID,(SELECT GROUP_CONCAT(lv SEPARATOR ',') FROM ( SELECT @pv:=(SELECT GROUP_CONCAT(ID SEPARATOR ',') FROM menu WHERE submenu IN (@pv)) AS lv FROM menu JOIN (SELECT @pv:=?)tmp WHERE submenu IN (@pv)) a)) UNION ALL SELECT * FROM menu WHERE ID=? ORDER BY ID ) complicated_menu INNER JOIN content vt ON complicated_menu.ID = vt.ID_MENU INNER JOIN path_files ON path_files.ID_CONTENT = vt.ID`
            , [menuId, menuId], (err, res) => {
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


                db.query('DELETE FROM menu WHERE ID=?', menuId, (err) => {
                    if (err) return result(err, null);

                    db.query(line, submenu, (err, menuList) => {
                        if (err) return result(err, null);

                        const menuListLength = menuList.length;
                        for (let i = 0; i < menuListLength; i++) {
                            (function () {
                                db.query('UPDATE menu SET sequence=? WHERE ID=?', [i + 1, menuList[i].ID, menuId], (err, res) => {
                                    if (err) return result(err, null);
                                })
                            })();
                        }
                        result(null, { result: res });
                    });
                })
            }
        );
    })
}

//END "POST


module.exports = Menu;