const express = require('express');
const router = express.Router();
const user_Controller = require('../Controllers/User');

// Admin
router.post('/register_user',user_Controller.register_user);
router.post('/login_user',user_Controller.login_user);
router.get('/profile',user_Controller.auth,async(req,res) => res.send(req.user));
router.post('/logout',user_Controller.auth,user_Controller.logout);
router.post('/logout_all',user_Controller.auth,user_Controller.logout_all);
router.put('/change_password',user_Controller.change_password);
router.put('/change_name',user_Controller.change_name);

module.exports = router;