const express = require('express');
const app = express();
const path = require('path');
var bodyParser = require('body-parser')
const mongoose = require("mongoose");
var console = require('tracer').colorConsole();

const loginRoutes = require('./routes/login');
const adminRoutes = require('./routes/admin');
const teacherRoutes = require('./routes/teacher');
const studentRoutes = require('./routes/student');


mongoose.connect("mongodb://127.0.0.1:27017/grade", function (err) {
  if (err) {
    console.log('连接失败');
  } else {
    console.log('连接成功');
  }
});

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/login', loginRoutes);
app.use('/admin', adminRoutes);
app.use('/teacher', teacherRoutes);
app.use('/student', studentRoutes);

module.exports = app;