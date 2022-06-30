/* eslint-disable newline-per-chained-call */
const { check, validationResult } = require('express-validator');

const productValidation = [
    // eslint-disable-next-line max-len
    // user: Path `user` is required., name: Please Enter product Name, description: Please Enter product Description, category: Please Enter Product Category

    check('name').not().isEmpty().withMessage('Enter Product name').trim(),
    check('description').not().isEmpty().withMessage('Enter product Description').trim(),
    check('category').not().isEmpty().withMessage('Enter product Description').trim(),
    check('stock')
        .not()
        .isEmpty()
        .withMessage('Please Enter product Stock')
        .isNumeric()
        .withMessage('Stock is only number')
        .isLength({
            max: 4,
        })
        .withMessage('Stock is not more then 4 digits')
        .trim(),
    check('price')
        .isNumeric()
        .withMessage('Price is only number')
        .isLength({
            max: 8,
        })
        .withMessage('price is not more then 8 digits'),
];

const productValidationError = (req, res, next) => {
    const error = validationResult(req);
    const mappedError = error.mapped();

    console.log(mappedError);
    if (Object.keys(mappedError).length === 0) {
        next();
    } else {
        res.status(401).json({
            error: mappedError,
        });
    }
};

module.exports = {
    productValidationError,
    productValidation,
};
