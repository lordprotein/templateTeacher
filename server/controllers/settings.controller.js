const Settings = require('../models/settings.module');


exports.getSetting = (req, res) => {
    Settings.getSetting(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found Settings in Settings with id ${req.params.name}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Settings in Settings with id ${req.params.name}`
                });
            }
        }
        else res.send(data);
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Settings.update(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while updating the Post'
            });
        else res.send(data);
    })
}

exports.updateImage = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Settings.updateImage(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while updating the Setting'
            });
            
        res.send(data);
    })
}