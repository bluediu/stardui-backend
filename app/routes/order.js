const { Router } = require('express');
const { check } = require('express-validator');
const {
  createOrder,
  getOrdersByUser,
} = require('../controllers/order');
const {
  validateFields,
  validateJWT,
} = require('../middlewares');

const router = Router();

router.post(
  '/create',
  [
    validateJWT,
    check('userId', 'user id is not valid').isMongoId(),
    validateFields,
  ],
  createOrder
);

router.get('/find/:userId', [validateJWT], getOrdersByUser);

module.exports = router;
