/* libs */
const { Router } = require('express');
const { check } = require('express-validator');

/* Controllers */
const {
  createUsers,
  deleteUser,
  getUsers,
  updateUsers,
} = require('../controllers/user.controller');

/* Helpers */
const {
  isValidRole,
  doesEmailExist,
  doesUserExistById,
} = require('../helpers');

/* Middlewares */
const {
  validateFields,
  validateJWT,
  isAdminRole,
  itHasRole,
} = require('../middlewares');

/* Creating a new instance of the Router class. */
const router = Router();

/* check('role', 'No is a valid role').isIn([
  'ADMIN_ROLE',
  'USER_ROLE',
]), */

router.get('/', getUsers);

router.post(
  '/',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('email').custom(doesEmailExist),
    check(
      'password',
      'Password must be at least 6 letter'
    ).isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields,
  ],
  createUsers
);

router.put(
  '/:id',
  [
    validateJWT,
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesUserExistById),
    check('role').custom(isValidRole),
    validateFields,
  ],
  updateUsers
);

router.delete(
  '/:id',
  [
    validateJWT,
    isAdminRole,
    itHasRole('ADMIN_ROLE', 'SALES_ROLE'),
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesUserExistById),
    validateFields,
  ],
  deleteUser
);

module.exports = router;
