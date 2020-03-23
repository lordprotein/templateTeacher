module.exports = app => {
    const file = require('../controllers/file.controller');
    const checkAuthorization = require('../controllers/checkAuthorization.controller');
    const {
        storageImages,
        storageDocuments,
        storageVideos,
        storageAudios
    } = require('../config/multer/storage.config');

    app.get('/post/:postId/files', file.fileList);
    app.get('/post/:postId/files/:fileType', file.fileListWithType);
    app.delete('/remove/file', checkAuthorization.check, file.delete);

    app.post('/upload/image/:postId', storageImages.single('filedata'), file.create);
    app.post('/upload/document/:postId', storageDocuments.single('filedata'), file.create);
    app.post('/upload/video/:postId', storageVideos.single('filedata'), file.create);
    app.post('/upload/audio/:postId', storageAudios.single('filedata'), file.create);

    app.get('/download/:folder/:file', (req, res) => {
        const { folder, file } = req.params;
        res.download(`downloads/${folder}/${file}`);
    })
}