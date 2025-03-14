/* Core */
import jwt from 'jsonwebtoken';
import { request, response } from 'express';

/* Models */
import { UserModel } from '../models/index.js';

/* Helpers */
import { handleError } from '../helpers/index.js';

/**
 * Middleware to validate a JSON Web Token (JWT).
 *
 * @async
 * @param {import('express').Request} req - Express request object.
 * @param {import('express').Response} res - Express response object.
 * @param {import('express').NextFunction} next - Express next function to pass control to the next middleware.
 * @returns {Promise<void>} Sends an error response if the token is invalid,
 * the user doesn't exist, or the user is inactive; otherwise, adds the user
 * to `req.user` and calls `next()`.
 */
export const validateJWT = async (req = request, res = response, next) => {
  let token = req.header('Authorization');

  // Check if token exists and has the correct format
  if (!token || !token.startsWith('Bearer ')) {
    return handleError({ res, msg: 'Invalid token format' });
  }

  // Extract the actual token
  token = token.split(' ')[1];

  if (!token) return handleError({ res, msg: 'Invalid token' });

  try {
    const { uid } = jwt.verify(token, process.env.SECRETORPRIVATEKEY);

    const user = await UserModel.findById(uid);

    if (!user) return handleError({ res, msg: 'User not found' });
    if (!user.state) return handleError({ res, msg: 'Invalid user' });

    // adds the user to `request body`
    req.user = user;

    return next();
    // eslint-disable-next-line no-unused-vars
  } catch (error) {
    return handleError({ res, msg: 'Invalid token signature' });
  }
};
