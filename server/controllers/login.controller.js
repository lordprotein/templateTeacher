const Login = require('../models/login.model');

exports.authorization = (req, res) => {
    if (!req.body) {
        res.status(400).send({
            message: "Content can not be empty!"
        });
    }
    Login.authorization(req.body, (err, data) => {
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