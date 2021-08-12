const { Router } = require('express');
const { check } = require('express-validator');

const {
  validateFields,
} = require('../middlewares/validate-fields');
const { validateJWT } = require('../middlewares');

const { createCategory } = require('../controllers/categories');

const router = Router();

// get all categories - public
router.get('/', (req, res) => {
  res.json({ ok: 'get' });
});

// get categories by id - public
router.get('/:id', (req, res) => {
  res.json({ ok: 'get id' });
});

// create category - private - any person with a valid token
router.post(
  '/',
  [
    validateJWT,
    check('name', 'Name is required').not().isEmpty(),
    validateFields,
  ],
  createCategory
);

// update - private - any person with a valid token
router.put('/:id', (req, res) => {
  res.json({ ok: 'update' });
});

// delete - Admins
router.delete('/:id', (req, res) => {
  res.json({ ok: 'delete' });
});

module.exports = router;
