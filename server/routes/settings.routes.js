module.exports = app => {
    const settings = require('../controllers/settings.controller');
    const checkAuthorization = require('../controllers/checkAuthorization.controller');
    const { storageMainImage } = require('../config/multer/storage.config');

    // app.get('/post/:postId/files', file.fileList);
    // app.get('/post/:postId/files/:fileType', file.fileListWithType);
    // app.delete('/remove/file', checkAuthorization.check, file.delete);

    app.get('/settings/:name', settings.getSetting);
    app.put('/settings', checkAuthorization.check, settings.update);
    app.post('/settings/download/image', storageMainImage.single('filedata'), settings.updateImage);
}