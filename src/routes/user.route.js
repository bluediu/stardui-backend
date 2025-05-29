/* Libs */
import { Router } from 'express';
import { check } from 'express-validator';

/* Controllers */
import {
  listUsers,
  createUser,
  deleteUser,
  updateUser,
  deleteUserImage,
} from '../controllers/index.js';

/* Middlewares */
import * as mw from '../middlewares/index.js';

/* Helpers */
import * as hp from '../helpers/index.js';

// Create router instance
const router = Router();

router.get('/list', mw.limitOffsetValidator, listUsers);

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

router.delete('/remove/image/:id', [mw.validateJWT], deleteUserImage);

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
