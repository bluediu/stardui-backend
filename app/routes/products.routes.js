/* libs */
const { Router } = require('express');
const { check } = require('express-validator');

/* Controllers */
const {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
  getLatestProductsAdded,
  getProductsByCategory,
} = require('../controllers/products.controller');

/* Middlewares */
const {
  validateJWT,
  isAdminRole,
  validateFields,
} = require('../middlewares');

/* Helpers */
const {
  doesCategoryExistById,
  doesProductExistById,
} = require('../helpers');

/* Creating a new instance of the Router class. */
const router = Router();

// get all products - public
router.get('/', getProducts);

// get the lastest product added with limit of 5
router.get('/latest', getLatestProductsAdded);

// get product by id - public
router.get(
  '/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesProductExistById),
    validateFields,
  ],
  getProductById
);

// get all products by category
router.get(
  '/category/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    validateFields,
  ],
  getProductsByCategory
);

// create product - private - any person with a valid token
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('price', 'The price is required').not().isEmpty(),
    check('category', 'The category is required').isMongoId(),
    check('category').custom(doesCategoryExistById),
    validateFields,
  ],
  createProduct
);

// update - private - any person with a valid token
router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesProductExistById),
    validateFields,
  ],
  updateProduct
);

// delete - Admins
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesProductExistById),
    validateFields,
  ],
  deleteProduct
);

module.exports = router;
