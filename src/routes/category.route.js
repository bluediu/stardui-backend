/* Libs */
import { Router } from 'express';
import { check } from 'express-validator';

/* Controllers */
import * as ctl from '../controllers/category.controller';

/* Middlewares */
import * as mw from '../middlewares';

/* Helpers */
import * as hp from '../helpers';

// Create router instance
const router = Router();

router.get('/list', mw.paginationParams, ctl.listCategories);

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
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateCategoryExistsById),
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
