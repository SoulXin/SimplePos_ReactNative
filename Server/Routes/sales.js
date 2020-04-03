const express = require('express');
const router = express.Router();
const sales_Controller = require('../Controllers/sales');

// Admin
router.post('/add_sales',sales_Controller.add_sales);
router.get('/show_sales/:type',sales_Controller.show_sales);
// router.put('/update_sales/:id',sales_Controller.update_sales);
// router.delete('/delete_sales/:id',sales_Controller.delete_sales);

module.exports = router;