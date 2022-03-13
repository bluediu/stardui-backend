const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
} = require('../middlewares/validate-fields');

const { validateJWT, isAdminRole } = require('../middlewares');

const {
  createProduct,
  getProducts,
  getProductById,
  putProduct,
  deleteProduct,
  getLatestProductsAdded,
} = require('../controllers/products');

const {
  doesCategoryExistById,
  doesProductExistById,
} = require('../helpers/db-validator');

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
  putProduct
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
