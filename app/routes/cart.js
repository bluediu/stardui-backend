const { Router } = require('express');
const { addProductToCart } = require('../controllers/cart');

const router = Router();

router.post('/add', addProductToCart);

module.exports = router;
