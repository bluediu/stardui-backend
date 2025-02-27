/* Libs */
import { Router } from 'express';
import { check } from 'express-validator';

/* Controllers */
import { login, renewToken } from '../controllers/index.js';

/* Middlewares */
import { validateFields, validateJWT } from '../middlewares/index.js';

// Create router instance
const router = Router();

router.post(
  '/login',
  [
    check('email', 'Invalid email').isEmail(),
    check('password', 'Password must be at least 5 characters long').isLength({
      min: 5,
    }),
    validateFields,
  ],
  login
);

router.get('/renew', validateJWT, renewToken);

export default router;
