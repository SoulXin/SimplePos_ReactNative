const express = require('express');
const router = express.Router();
const employee_Controller = require('../Controllers/employee');

// Admin
router.post('/add_employee',employee_Controller.add_employee);
router.get('/show_employee/:user_id',employee_Controller.show_employee);
router.put('/update_employee/:id',employee_Controller.update_employee);
router.delete('/delete_employee/:id',employee_Controller.delete_employee);

module.exports = router;