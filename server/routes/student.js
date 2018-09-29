const express = require("express");
const router = express.Router();

const studentController = require('../controllers/student')

router.post('/task', studentController.get_taks);


module.exports = router;