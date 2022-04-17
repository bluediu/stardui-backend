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
    check('amount', 'amount is required').not().isEmpty(),
    check('address', 'address is required').not().isEmpty(),
    check('deliveryTime', 'deliveryTime is required')
      .not()
      .isEmpty(),
    check('creditCartNumber', 'creditCartNumber is required')
      .not()
      .isEmpty(),
    check('creditCartOwnerName', 'amount is required')
      .not()
      .isEmpty(),
    validateFields,
  ],
  createOrder
);

router.get('/find/:userId', [validateJWT], getOrdersByUser);

module.exports = router;
