const express = require('express');
const router = express.Router();
const cartController = require('../controllers/cartController');

router.get('/:cartId',cartController.getCart);
router.post('/create',cartController.createCart);
router.post('/:cartId/products/:productId',cartController.addToCart);
router.put('/:cartId/products/:productId',cartController.updateCart);
router.delete('/:cartId/products/:productId',cartController.deleteProduct);

module.exports = router;