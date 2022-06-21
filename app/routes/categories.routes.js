const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
} = require('../middlewares/validate-fields');

const { validateJWT, isAdminRole } = require('../middlewares');

const {
  createCategory,
  getCategories,
  getCategoryById,
  putCategory,
  deleteCategory,
} = require('../controllers/categories');

const {
  doesCategoryExistById,
} = require('../helpers/db-validator');

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
  putCategory
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
