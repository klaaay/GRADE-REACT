const express = require("express");
const router = express.Router();

const multer = require('multer');

const storageWord = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/word');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadWord = multer({
  storage:storageWord
});

const storagePPT = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/ppt');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadPPT = multer({
  storage:storagePPT
});

const storageVideo = multer.diskStorage({
  destination: function(req, file, cb) {
    cb(null, './public/video');
  },
  filename: function(req, file, cb) {
    cb(null, file.originalname);
  }
});

const uploadVideo = multer({
  storage:storageVideo
});

const studentController = require('../controllers/student')

router.post('/task', studentController.get_taks);

router.post('/word',uploadWord.single('taskWord'),(req,res,next)=>{
  console.log(req.file);
  res.json({
    test:'test_word'
  })
})

router.post('/ppt',uploadPPT.single('taskPPT'),(req,res,next)=>{
  console.log(req.file);
  res.json({
    test:'test_ppt'
  })
})

router.post('/video',uploadVideo.single('taskVideo'),(req,res,next)=>{
  console.log(req.file);
  res.json({
    test:'test_video'
  })
})

module.exports = router;