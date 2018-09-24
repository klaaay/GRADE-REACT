const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");


exports.add_user = (req, res) => {
  console.log(req.body);
  var userName = req.body.userName;
  var password = req.body.password;
  var repass = req.body.repass;
  var name = req.body.name;
  var role = req.body.role;
  if (!userName || !password || !repass || !role) {
    res.send({
      status: 'failed',
      message: '请填写完整信息'
    })
  } else {
    if (password !== repass) {
      res.send({
        status: 'failed',
        message: '密码输入不一致',
      })
    } else {
      User.find({ userName: userName }, function (err, doc) {
        if (doc[0]) {
          res.send({
            status: 'failed',
            message: '该账户名已经存在'
          })
        } else {
          var user_doc = new User({
            _id: new mongoose.Types.ObjectId(),
            userName: userName,
            password: password,
            role: role
          })
          if (role === 'teacher') {
            user_doc.save(function (err, doc) {
              console.log(doc);
              var teacher_doc = new Teacher({
                id: user_doc._id,
                name: name
              })
              teacher_doc.save(function (err, doc) {
                console.log(doc);
              })
            })
          } else if (role === 'student') {
            user_doc.save(function (err, doc) {
              console.log(doc);
              var student_doc = new Student({
                id: user_doc._id,
                name: name
              })
              student_doc.save(function (err, doc) {
                console.log(doc);
              })
            })
          }
          res.send({
            status: 'success',
            message: '添加成功',
          })
        }
      })
    }
  }
}

exports.search_user_list = (req, res) => {
  console.log(req.body.role);
  if (req.body.role === 'teacher') {
    User.find({ role: 'teacher' }, { userName: 1, password: 1, _id: 0 }, function (err, doc) {
      console.log(doc)
      res.send({
        teacherList: doc
      })
    })
  } else if (req.body.role === 'student') {
    User.find({ role: 'student' }, { userName: 1, password: 1, _id: 0 }, function (err, doc) {
      console.log(doc)
      res.send({
        studentList: doc
      })
    })
  }
}

exports.class_control = (req, res, next) => {
  console.log(req.body);
  const { addRole, addName, nowClass } = req.body;
  console.log(addName)
  if (addRole === 'class') {
    const class_doc = new Class({
      _id: new mongoose.Types.ObjectId(),
      name: addName
    });
    class_doc
      .save()
      .then(result => {
        console.log(result);
      })
      .catch(err => {
        console.log(err)
      })
  } else if (addRole === 'teacher') {
    Teacher.find({ name: addName })
      .exec()
      .then(doc => {
        Class.update({ name: nowClass }, { $push: { teachers: doc[0].name } })
          .exec()
      })
  } else if (addRole === 'student') {
    Student.find({ name: addName })
      .exec()
      .then(doc => {
        Class.update({ name: nowClass }, { $push: { classMates: doc[0].name } })
          .exec()
      })
    Student.update({ name: addName }, { $set: { class: nowClass } })
      .exec()
  }
}