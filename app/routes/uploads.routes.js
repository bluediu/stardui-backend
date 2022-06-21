/* eslint-disable implicit-arrow-linebreak */
const { Router } = require('express');
const { check } = require('express-validator');

/* Controllers */
const {
  fileUpload,
  updateImageCloudinary,
  showImage,
  // updateImage,
} = require('../controllers/uploads.controller');

/* Helpers */
const { allowedCollections } = require('../helpers');

/* Middlewares */
const {
  validateFields,
  validateFile,
} = require('../middlewares');

/* Creating a new instance of the Router class. */
const router = Router();

router.post('/', validateFile, fileUpload);

/* updateImage -> route that save images in file system */
router.put(
  '/:collection/:id',
  [
    validateFile,
    check('id', 'The id must be a mongoID').isMongoId(),
    check('collection').custom(
      (c) => allowedCollections(c, ['users', 'products'])
      // eslint-disable-next-line function-paren-newline
    ),
    validateFields,
  ],
  updateImageCloudinary
);

router.get(
  '/:collection/:id',
  [
    check('id', 'The id must be a mongoID').isMongoId(),
    check('collection').custom(
      (c) => allowedCollections(c, ['users', 'products'])
      // eslint-disable-next-line function-paren-newline
    ),
    validateFields,
  ],
  showImage
);

module.exports = router;
