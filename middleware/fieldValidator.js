const { validationResult } = require('express-validator');

const fieldValidator = (req, res, next) => {
    const error = validationResult(req);
    if (!error.isEmpty()) {
        return res.status(400).json({
            ok: false,
            errors: error.mapped(),
            message: 'Please provide all required fields'
        });
    }
    next();
};

module.exports = {
    fieldValidator
};