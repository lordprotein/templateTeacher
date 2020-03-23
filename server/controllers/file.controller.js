const File = require('../models/file.module');


exports.fileList = (req, res) => {
    File.fileList(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Files in Post with id ${req.params.postId}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Files in Post with id ${req.params.postId}`
                });
            }
        }
        else res.send(data);
    })
}


exports.fileListWithType = (req, res) => {
    File.fileListWithType(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Files in Post with id ${req.params.postId} and type ${req.params.fileType}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Files in Post with id ${req.params.postId} and type ${req.params.fileType}`
                });
            }
        }
        else res.send(data);
    })
}


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    File.create(req, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while creating the File."
            });
        }
        else {
            res.send(data);
        }
    })
}


exports.delete = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    File.delete(req.body, (err, data) => {
        if (err) {
            res.status(500).send({
                message: err.message || "Some error occurred while deleting the File."
            });
        }
        else {
            res.send(data);
        }
    })
}