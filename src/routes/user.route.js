/* Libs */
import { Router } from 'express';
import { check } from 'express-validator';

/* Controllers */
import { listUsers, createUser, deleteUser, updateUser } from '../controllers';

/* Middlewares */
import * as mw from '../middlewares';

/* Helpers */
import * as hp from '../helpers';

// Create router instance
const router = Router();

router.get('/list', mw.paginationParams, listUsers);

router.post(
  '/create',
  [
    check('name', 'Name is required').not().isEmpty(),
    check('role').custom(hp.validateRoleExists).not().isEmpty(),
    check('email').custom(hp.checkEmailAvailability).not().isEmpty(),
    check('password', 'Password must be at least 6 characters')
      .isLength({ min: 6 })
      .not()
      .isEmpty(),
    mw.validateFields,
  ],
  createUser
);

router.patch(
  '/update/:id',
  [
    mw.validateJWT,
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateUserExistsById),
    check('role').optional().custom(hp.validateRoleExists),
    mw.validateFields,
  ],
  updateUser
);

router.delete(
  '/delete/:id',
  [
    mw.validateJWT,
    mw.isAdminRole,
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateUserExistsById),
    mw.validateFields,
  ],
  deleteUser
);

export default router;
