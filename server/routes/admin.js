const express = require("express");
const router = express.Router();

const adminController = require('../controllers/admin')

router.post('/add', adminController.add_user);
router.post('/change', adminController.change_password);
router.post('/search_list', adminController.search_user_list);


module.exports = router;