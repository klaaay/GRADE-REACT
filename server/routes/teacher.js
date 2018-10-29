const express = require("express");
const router = express.Router();

const teacherController = require('../controllers/teacher')

router.post('/class', teacherController.search_class_list)
router.post('/publish', teacherController.publish_task)
router.post('/published', teacherController.published_task)
router.post('/delete', teacherController.deleted_task)
router.post('/detail', teacherController.task_detail)

router.post('/classControl', teacherController.class_control)
router.post('/classList', teacherController.get_class_list)
router.post('/evalStandModify', teacherController.modify_stand)

module.exports = router;