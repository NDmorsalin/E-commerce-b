/* eslint-disable no-unused-vars */
const createError = require('http-errors');

const notFoundError = (req, res, next) => {
    next(createError(404, 'Page not found'));
};

const defaultError = (err, req, res, next) => {
    console.log(err);

    res.status(err.status).json({
        error: {
            common: {
                msg: err.message,
            },
        },
        errUrl: req.originalUrl,
    });
};

module.exports = {
    notFoundError,
    defaultError,
};
