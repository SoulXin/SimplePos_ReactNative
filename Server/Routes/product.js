const express = require('express');
const router = express.Router();
const product_Controller = require('../Controllers/product');

// Admin
router.post('/add_product',product_Controller.add_product);
router.get('/show_product',product_Controller.show_product);
router.put('/update_product/:id',product_Controller.update_product);
router.delete('/delete_product/:id',product_Controller.delete_product);
router.get('/detail_product/:id',product_Controller.detail_product);

module.exports = router;