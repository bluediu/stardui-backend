const { Router } = require('express');
const { check } = require('express-validator');
const {
  addProductToCart,
  getCartOfSpecificUser,
  countProductsOfSpecificUser,
  isProductAddedToCart,
} = require('../controllers/cart');
const { validateFields } = require('../middlewares');

const router = Router();

router.get(
  '/:userid',
  [
    check('userid', 'It is not valid id').isMongoId(),
    validateFields,
  ],
  getCartOfSpecificUser
);

router.get(
  '/count/:userid',
  [
    check('userid', 'It is not valid id').isMongoId(),
    validateFields,
  ],
  countProductsOfSpecificUser
);

router.get(
  '/verify/:productId',
  [
    check('productId', 'It is not valid id').isMongoId(),
    validateFields,
  ],
  isProductAddedToCart
);

// TODO: VALIDATE TOKEN LATER

router.post(
  '/add',
  [
    check('userId', 'It is not a valid id').isMongoId(),
    check('productId', 'There are not products').not().isEmpty(),
    check(
      'quantity',
      'Quantity is undefined or not it is a number'
    ).isNumeric(),
    validateFields,
  ],
  addProductToCart
);

module.exports = router;
