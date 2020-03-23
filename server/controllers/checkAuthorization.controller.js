const CheckAuthorization = require('../models/checkAuthorization.model');

exports.check = (req, res, next) => {
    CheckAuthorization.check(req, (err, data) => {
        if (err) {
            if (err.kind === 'not_found') {
                res.status(404).send({
                    message: `Not found User in users with id ${req.body.ID}.`
                });
            }
            else {
                res.status(500).send({
                    message: `Error retrieving Users in Post with id ${req.body.ID}`
                });
            }
        }
        else return next();
    })
}