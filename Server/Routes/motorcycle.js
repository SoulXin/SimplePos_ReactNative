const express = require('express');
const router = express.Router();
const motorcycle_Controller = require('../Controllers/motorcycle');

// Admin
router.post('/add_motorcycle',motorcycle_Controller.add_motorcycle);
router.get('/show_motorcycle/:user_id',motorcycle_Controller.show_motorcycle);
router.put('/update_motorcycle/:id',motorcycle_Controller.update_motorcycle);
router.delete('/delete_motorcycle/:id',motorcycle_Controller.delete_motorcycle);
router.get('/filter_motorcycle/:type/:user_id',motorcycle_Controller.filter_motorcycle);

module.exports = router;