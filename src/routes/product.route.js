/* Libs */
import { Router } from 'express';
import { check } from 'express-validator';

/* Controllers */
import * as ctl from '../controllers/product.controller.js';

/* Middlewares */
import * as mw from '../middlewares/index.js';

/* Helpers */
import * as hp from '../helpers/index.js';

// Create router instance
const router = Router();

const REQUIRED_ROLES = ['ADMIN_ROLE', 'SALES_ROLE'];

router.get('/list', mw.pagePaginationValidator, ctl.listProducts);

router.get(
  '/get/:id',
  [
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateProductExistsById),
    mw.validateFields,
  ],
  ctl.getProduct
);

router.get(
  '/category/:id',
  [
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateCategoryExistsById),
    mw.validateFields,
  ],
  ctl.getProductsByCategory
);

router.get(
  '/search/:term',
  [check('term', 'Invalid search term').isString(), mw.validateFields],
  ctl.searchProducts
);

router.get('/latest', ctl.getLatestProducts);

router.post(
  '/create',
  [
    mw.validateJWT,

    mw.hasRequiredRole(...REQUIRED_ROLES),

    // Request body
    check('name', 'Name is required').not().isEmpty(),
    check('size', 'Size is required').not().isEmpty().isArray(),
    check('price', 'Price is required').not().isEmpty().isNumeric(),
    check('description', 'Description is required').not().isEmpty(),
    check('img').isEmpty().optional(),

    check('category', 'Category is required').not().isEmpty(),
    check('category', 'Invalid ID format').isMongoId(),
    check('category').custom(hp.validateCategoryExistsById),

    mw.validateFields,
  ],
  ctl.createProduct
);

router.patch(
  '/update/:id',
  [
    mw.validateJWT,

    mw.hasRequiredRole(...REQUIRED_ROLES),

    // Param
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateProductExistsById),

    // Request body
    check('name', 'Name is required').optional(),
    check('size', 'Size is required').isArray().optional(),
    check('price', 'Price is required').isNumeric().optional(),
    check('description', 'Description is required').optional(),
    check('img').isEmpty().optional(),

    check('category', 'Category is required').optional(),
    check('category', 'Invalid ID format').isMongoId().optional(),
    check('category').custom(hp.validateCategoryExistsById).optional(),

    mw.validateFields,
  ],
  ctl.updateProduct
);

router.delete(
  '/delete/:id',
  [
    mw.validateJWT,
    mw.isAdminRole,
    check('id', 'Invalid ID format').isMongoId(),
    check('id').custom(hp.validateProductExistsById),
    mw.validateFields,
  ],
  ctl.deleteProduct
);

export default router;
