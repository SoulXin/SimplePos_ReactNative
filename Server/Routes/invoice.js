const express = require('express');
const router = express.Router();
const invoice_Controller = require('../Controllers/invoice');

// Admin
router.post('/add_invoice',invoice_Controller.add_invoice);
router.get('/show_invoice/:user_id',invoice_Controller.show_invoice);
router.put('/update_invoice/:id',invoice_Controller.update_invoice);
router.delete('/delete_invoice/:id',invoice_Controller.delete_invoice);
router.get('/detail_invoice/:id',invoice_Controller.detail_invoice);

module.exports = router;