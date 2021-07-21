const { Router } = require('express');
const { check } = require('express-validator');
const {
  getUsers,
  putUsers,
  postUsers,
  deleteUser,
  patchUsers,
} = require('../controllers/user');

const { isValidRole } = require('../helpers/db-validator');

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
    check('email', 'Email is incorred').isEmail(),
    check(
      'password',
      'Password must be at least 6 letter'
    ).isLength({ min: 6 }),
    check('role').custom(isValidRole),
    validateFields,
  ],
  postUsers
);

router.put('/:id', putUsers);

router.delete('/', deleteUser);

router.patch('/', patchUsers);

module.exports = router;
