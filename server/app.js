const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
var console = require('tracer').colorConsole();
const cors = require('cors');

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');
const publicRoutes = require('./routes/public')

const User = require('./models/User');


mongoose.connect("mongodb://127.0.0.1:27017/homeworkJudege", function (err) {
  if (err) {
    console.log('连接失败');
  } else {
    console.log('连接成功');
  }
});

app.use(cors());

app.use('/public', express.static('public'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));

app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);
app.use('/public', publicRoutes)

module.exports = app;


// var User_doc = new User({
//   _id: new mongoose.Types.ObjectId(),
//   userName: "admin",
//   password: "123456",
//   role: "admin",
// })
// User_doc.save(() => { })