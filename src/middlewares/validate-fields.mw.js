import { validationResult } from 'express-validator';

/**
 * Middleware to validate request fields using express-validator.
 *
 * @param {Request} req - Express request object.
 * @param {Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {void} Sends a 400 response with validation errors if any exist, otherwise calls `next()`.
 */
export const validateFields = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) return res.status(400).json(errors);

  next();
};
