const { Router } = require('express');
const { check } = require('express-validator');

const {
  login,
  googleSignIn,
  revalidateToken,
} = require('../controllers/auth');

const { validateJWT } = require('../middlewares');

const {
  validateFields,
} = require('../middlewares/validate-fields');

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
