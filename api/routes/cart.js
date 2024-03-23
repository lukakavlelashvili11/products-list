const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:cartId',cartController.getCart);
router.post('/create',cartController.createCart);
router.post('/:cartId/products/:productId',cartController.addToCart);

module.exports = router;