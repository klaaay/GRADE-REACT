const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin')
const publicController = require('../controllers/public')

router.post('/change', publicController.change_password);

router.post('/add', adminController.add_user);
router.post('/search_list', adminController.search_user_list);
router.post('/class_control', adminController.class_control);
router.get('/getClasses', adminController.get_classes);
router.post('/getClassInfo', adminController.get_class_info);


module.exports = router;