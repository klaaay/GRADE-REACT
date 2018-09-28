const express = require("express");
const router = express.Router();

const teacherController = require('../controllers/teacher')

router.post('/class',teacherController.search_class_list)
router.post('/publish',teacherController.publish_task)
router.post('/published',teacherController.published_task)
router.post('/delete',teacherController.deleted_task)

module.exports = router;