module.exports = app => {
    const menu = require('../controllers/menu.controller');
    const checkAuthorization = require('../controllers/checkAuthorization.controller');

    app.get('/menu', menu.allList);
    app.get('/menu/:menuId', menu.findById);
    app.get('/menu/position/:position', menu.position);
    
    app.put('/menu/sequence', checkAuthorization.check, menu.updateSequence);
    app.post('/menu', checkAuthorization.check, menu.create);
    app.put('/menu', checkAuthorization.check, menu.update);
    app.delete('/menu', checkAuthorization.check, menu.delete);
}