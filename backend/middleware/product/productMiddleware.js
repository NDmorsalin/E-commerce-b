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
  .isNumeric()
  .withMessage('Price is only number')
  .isLength({
    max: 8
  })
  .withMessage('price is not more then 8 digits'),
]

const productValidatiorError = async (req, res, next)=> {
  const error = await validationResult(req)
  const mappedError = error.mapped()

  console.log(mappedError)
  if (Object.keys(mappedErrors).length === 0) {
    next()
  } else {
    console.log(mappedError)
    res.status(401).json({
      error: mappedErrors,
    });
  }
}