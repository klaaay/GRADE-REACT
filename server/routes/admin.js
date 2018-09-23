const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin')

router.post('/add', adminController.add_user);
router.post('/change', adminController.change_password);
router.post('/search_list', adminController.search_user_list);
router.post('/class_control',adminController.class_control);


module.exports = router;