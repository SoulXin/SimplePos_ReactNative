const express = require('express');
const router = express.Router();
const employee_work_Controller = require('../Controllers/employee_work');

// Admin
router.post('/add_employee_work',employee_work_Controller.add_employee_work);
router.get('/show_employee_work/:user_id',employee_work_Controller.show_employee_work);
router.delete('/delete_mechanic/:name/:user_id',employee_work_Controller.delete_mechanic);

module.exports = router;