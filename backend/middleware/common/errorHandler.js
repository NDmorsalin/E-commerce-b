const createError = require('http-errors');

const notFoundError = (req, res, next) => {
    next(createError(404, 'Page not found'));
};

const defaultError = (err, req, res, next) => {
    console.log(err);
    res.json({
        error: err,
        errUrl: req.originalUrl,
    });
};

module.exports = {
    notFoundError,
    defaultError,
};
