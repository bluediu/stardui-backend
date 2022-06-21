/* libs */
const { Router } = require('express');
const { check } = require('express-validator');

/* Controller */
const {
  login,
  googleSignIn,
  revalidateToken,
} = require('../controllers/auth.controller');

/* Middlewares */
const {
  validateJWT,
  validateFields,
} = require('../middlewares');

/* Creating a new instance of the Router class. */
const router = Router();

router.post(
  '/login',
  [
    check('email', 'Email is required').isEmail(),
    check('password', 'Password is required').not().isEmpty(),
    validateFields,
  ],
  login
);

router.post(
  '/google',
  [
    check('id_token', 'The id_token is required')
      .not()
      .isEmpty(),
    validateFields,
  ],
  googleSignIn
);

router.get('/renew', validateJWT, revalidateToken);

module.exports = router;
