const {
  check,
  validationResult
} = require('express-validator');
const productValidatior = [
  check('name')
  .isEmpty()
  .withMessage('Name is not empty'),
  check('description')
  .isEmpty()
  .withMessage('Please Enter product Description')
  .trim(),
  check ('price')
  .isNumber()
  .withMessage('Price is only number')
  .isLength({
    max: 8
  })
  .withMessage('price is not more then 8 digits'),
  

]