const Menu = require('../models/menu.model');




exports.allList = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Menu.allList((err, data) => {
        if (err)
            res.status(500).send({
                message: err.message || "Some error occurred while retrieving menu."
            });
        else res.send(data);
    });
}


exports.findById = (req, res) => {
    Menu.findById(req.params.menuId, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Menu with id ${req.params.menuId}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Menu with id " + req.params.menuId
                });
            }
        }
        else res.send(data);
    });
}


exports.position = (req, res) => {
    Menu.position(req.params.position, (err, data) => {
        if (err) {
            if (err.kind === "not_found") {
                res.status(404).send({
                    message: `Not found Menu with Position ${req.params.position}.`
                });
            }
            else {
                res.status(500).send({
                    message: "Error retrieving Menu with Position " + req.params.position
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

    Menu.create(req, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Menu."
            });
        else res.send(data);
    })
}

exports.update = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }

    Menu.update(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || "Some error occurred while creating the Menu."
            });
        else res.send(data);
    });
}

exports.updateSequence = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: 'Content can not be empty!'
        });
    }

    Menu.updateSequence(req.body, (err, data) => {
        if (err)
            res.status(500).send({
                message:
                    err.message || 'Some error occurred while update sequence of Menu'
            });
        else res.send(data);
    })
}

exports.delete = (req, res) => {
    Menu.delete(req.body.ID, (err, data) => {
        if (err) return res.send(err);

        res.send(data);
    });
}