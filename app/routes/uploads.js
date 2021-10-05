/* eslint-disable implicit-arrow-linebreak */
const { Router } = require('express');
const { check } = require('express-validator');

const {
  fileUpload,
  updateImageCloudinary,
  showImage,
} = require('../controllers/uploads');

const { allowedCollections } = require('../helpers');
const {
  validateFields,
  validateFile,
} = require('../middlewares');

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
