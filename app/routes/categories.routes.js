/* libs */
const { Router } = require('express');
const { check } = require('express-validator');

/* Controllers */
const {
  createCategory,
  getCategories,
  getCategoryById,
  updateCategory,
  deleteCategory,
} = require('../controllers/categories.controller');

/* Middlewares */
const {
  validateJWT,
  isAdminRole,
  validateFields,
} = require('../middlewares');

/* Helpers */
const { doesCategoryExistById } = require('../helpers');

/* Creating a new instance of the Router class. */
const router = Router();

// get all categories - public
router.get('/', getCategories);

// get categories by id - public
router.get(
  '/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesCategoryExistById),
    validateFields,
  ],
  getCategoryById
);

// create category - private - any person with a valid token
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// update - private - any person with a valid token
router.put(
  '/:id',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesCategoryExistById),
    validateFields,
  ],
  updateCategory
);

// delete - Admins
router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesCategoryExistById),
    validateFields,
  ],
  deleteCategory
);

module.exports = router;
