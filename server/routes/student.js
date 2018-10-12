const express = require("express");
const router = express.Router();

const multer = require('multer');

const storageWord = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/word');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadWord = multer({
  storage: storageWord
});

const storagePPT = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/ppt');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadPPT = multer({
  storage: storagePPT
});

const storageVideo = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './public/video');
  },
  filename: function (req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadVideo = multer({
  storage: storageVideo
});

const studentController = require('../controllers/student')

router.post('/task', studentController.get_tasks);

router.post('/askedTasks', studentController.get_asked_tasks);

router.post('/initialTaskInfo',studentController.get_initial_task_info);

router.post('/word', uploadWord.single('taskWord'), studentController.word_upload)

router.post('/ppt', uploadPPT.single('taskPPT'), studentController.ppt_upload)

router.post('/video', uploadVideo.single('taskVideo'), studentController.video_upload)

module.exports = router;