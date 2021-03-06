const express = require('express');
const router = express.Router();
const income_Controller = require('../Controllers/income');

// Admin
router.post('/add_income',income_Controller.add_income);
router.get('/show_income/:type/:user_id',income_Controller.show_income);

module.exports = router;