const express = require("express");
const router = express.Router();

const teacherController = require('../controllers/teacher')

router.post('/class',teacherController.search_class_list)
router.post('/publish',teacherController.publish_task)

module.exports = router;