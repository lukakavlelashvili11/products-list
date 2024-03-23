const express = require('express');
const router = express.Router();
const productController = require('../controllers/productController');

router.post('/add',productController.addProductsInitialList);
router.get('/',productController.getProductList);
router.get('/get/:id',productController.getProductById);

module.exports = router;