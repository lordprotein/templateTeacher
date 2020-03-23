const Post = require('../models/post.model');


exports.postList = (req, res) => {
    Post.postList(req.params.menuId, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Content in Menu with id ${req.params.menuId}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Content in Menu with id ${req.params.menuId}`
                });
            }
        }
        else res.send(data);
    })
}


exports.create = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Post.create(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while creating the Post'
            });
        else res.send(data);
    })
}


exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Post.update(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while updating the Post'
            });
        else res.send(data);
    })
}


exports.delete = (req, res) => {
    Post.delete(req.body.ID, (err, data) => {
        if (err) return res.send({ status: err })

        res.send(data);
    })
}

exports.updateSequence = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Post.updateSequence(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update sequence of Post'
            });
        else res.send(data);
    })
}