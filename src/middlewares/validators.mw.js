import { query, validationResult } from 'express-validator';

/**
 * Middleware to validate query parameters: limit and skip
 */
export const limitOffsetValidator = [
  query('limit')
    .optional()
    .isInt({ min: 1 })
    .withMessage('`Limit` must be greater than or equal to one'),

  query('from')
    .optional()
    .isInt({ min: 0 })
    .withMessage('`From` must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];

/**
 * Middleware to validate page pagination parameters.
 */
export const pagePaginationValidator = [
  query('page')
    .optional()
    .isInt({ min: 1 })
    .withMessage('`Page` must be greater than or equal to one'),

  query('perPage')
    .optional()
    .isInt({ min: 0 })
    .withMessage('`perPage` must be a positive number'),

  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }
    next();
  },
];
