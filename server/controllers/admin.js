const mongoose = require("mongoose");

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");


exports.add_user = (req, res) => {
  console.log(req.body);
  var userName = req.body.userName;
  var password = req.body.password;
  var repass = req.body.repass;
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
                id: user_doc._id
              })
              teacher_doc.save(function (err, doc) {
                console.log(doc);
              })
            })
          } else if (role === 'student') {
            user_doc.save(function (err, doc) {
              console.log(doc);
              var student_doc = new Student({
                id: user_doc._id
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

exports.change_password = (req, res) => {
  console.log(req.body);
  var userName = req.body.userName;
  var relOld = req.body.relOld;
  var oldPass = req.body.oldPass;
  var newPass = req.body.newPass;
  var reNewPass = req.body.reNewPass;
  if (!oldPass || !newPass || !reNewPass) {
    res.send({
      status: 'failed',
      message: '请填写完整信息'
    })
  } else {
    if (relOld !== oldPass) {
      res.send({
        status: 'failed',
        message: '原密码错误'
      })
    } else {
      if (newPass === oldPass) {
        res.send({
          status: 'failed',
          message: '新密码不能与原密码相同'
        })
      } else {
        if (newPass !== reNewPass) {
          res.send({
            status: 'failed',
            message: '输入两次密码不一致'
          })
        } else {
          var a = User.update({ userName: userName }, { $set: { password: newPass } }).exec();
          console.log(a);
          res.send({
            status: 'success',
            message: '密码修改成功'
          })
        }
      }
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