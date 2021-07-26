const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUser,
  patchUsers,
} = require('../controllers/user');

const {
  isValidRole,
  doesEmailExist,
  doesUserExistById,
} = require('../helpers/db-validator');

const {
  validateFields,
} = require('../middlewares/validate-fields');

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
  postUsers
);

router.put(
  '/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesUserExistById),
    check('role').custom(isValidRole),
    validateFields,
  ],
  putUsers
);

router.delete(
  '/:id',
  [
    check('id', 'It is not a valid id').isMongoId(),
    check('id').custom(doesUserExistById),
    validateFields,
  ],
  deleteUser
);

router.patch('/', patchUsers);

module.exports = router;
