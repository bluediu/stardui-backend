const { validationResult } = require('express-validator');

/**
 * If there are errors, return a 400 status code and the errors. Otherwise, call the next function.
 * @param {request} req - The request object.
 * @param {response} res - The response object.
 * @param next - The next middleware function in the stack.
 * @returns The validateFields function is being returned.
 */
const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(errors);
  }

  return next();
};

module.exports = {
  validateFields,
};
