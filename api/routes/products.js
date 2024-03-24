const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.get('/',productController.getProductList);
router.get('/get/:id',productController.getProductById);

module.exports = router;