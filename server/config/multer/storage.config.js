const multer = require('multer');
const { fileFilter } = require('./filter.config');


const storageConfigMainImage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'downloads/images/mainImage')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const storageConfigImages = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'downloads/images')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const storageConfigDocuments = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'downloads/documents')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const storageConfigVideos = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'downloads/videos')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});

const storageConfigAudios = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'downloads/audios')
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + '_' + file.originalname);
    }
});




exports.storageMainImage = multer({ storage: storageConfigMainImage, filter: fileFilter });
exports.storageImages = multer({ storage: storageConfigImages, filter: fileFilter });
exports.storageDocuments = multer({ storage: storageConfigDocuments, filter: fileFilter });
exports.storageVideos = multer({ storage: storageConfigVideos, filter: fileFilter });
exports.storageAudios = multer({ storage: storageConfigAudios, filter: fileFilter });