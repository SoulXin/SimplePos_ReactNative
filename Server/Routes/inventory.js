const express = require('express');
const router = express.Router();
const inventory_Controller = require('../Controllers/inventory');

// Admin
router.get('/show_inventory/:user_id',inventory_Controller.show_inventory);
router.put('/update_inventory/:id',inventory_Controller.update_inventory);

module.exports = router;