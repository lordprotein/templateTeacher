module.exports = app => {
    const post = require('../controllers/post.controller');
    const checkAuthorization = require('../controllers/checkAuthorization.controller');
    app.get('/menu/:menuId/posts', post.postList);

    app.post('/post', checkAuthorization.check, post.create);
    app.put('/post', checkAuthorization.check, post.update);
    app.put('/post/sequence', checkAuthorization.check, post.updateSequence);
    app.delete('/post', checkAuthorization.check, post.delete);
}