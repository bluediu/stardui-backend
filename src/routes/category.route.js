/* Libs */
import { Router } from 'express';
import { check } from 'express-validator';

/* Controllers */
import * as ctl from '../controllers/category.controller.js';

/* Middlewares */
import * as mw from '../middlewares/index.js';

/* Helpers */
import * as hp from '../helpers/index.js';

// Create router instance
const router = Router();

router.get('/list', mw.limitOffsetValidator, ctl.listCategories);

router.get(
  '/get/:id',
  [
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateCategoryExistsById),
    mw.validateFields,
  ],
  ctl.getCategory
);

router.post(
  '/create',
  [
    mw.validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    mw.validateFields,
  ],
  ctl.createCategory
);

router.patch(
  '/update/:id',
  [
    mw.validateJWT,

    // Param
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateCategoryExistsById),

    // Request body
    check('name', 'Name is required').not().isEmpty(),

    mw.validateFields,
  ],
  ctl.updateCategory
);

router.delete(
  '/delete/:id',
  [
    mw.validateJWT,
    mw.isAdminRole,
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateCategoryExistsById),
    mw.validateFields,
  ],
  ctl.deleteCategory
);

export default router;
