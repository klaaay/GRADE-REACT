const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");


exports.add_user = (req, res) => {
  var userName = req.body.userName;
  var password = req.body.password;
  var repass = req.body.repass;
  var name = req.body.name;
  var role = req.body.role;
  if (!userName || !password || !repass || !role) {
    res.send({
      type: 0,
      message: '请填写完整信息'
    })
  } else {
    if (password !== repass) {
      res.send({
        type: 0,
        message: '密码输入不一致',
      })
    } else {
      User.find({ userName: userName }, function (err, doc) {
        if (doc[0]) {
          res.send({
            type: 0,
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
            Teacher.find({ name: name }, (err, doc) => {
              if (doc[0]) {
                res.json({
                  type: 0,
                  message: '该用户已经存在'
                })
              } else {
                user_doc.save(function (err, doc) {
                  var teacher_doc = new Teacher({
                    id: user_doc._id,
                    name: name
                  })
                  teacher_doc.save(function (err, doc) {
                    res.json({
                      type: 1,
                      message: '创建成功'
                    })
                  })
                })
              }
            })
          } else if (role === 'student') {
            Student.find({ name: name }, (err, doc) => {
              if (doc[0]) {
                res.json({
                  type: 0,
                  message: '该用户已经存在'
                })
              } else {
                user_doc.save(function (err, doc) {
                  var student_doc = new Student({
                    id: user_doc._id,
                    name: name
                  })
                  student_doc.save(function (err, doc) {
                    res.json({
                      type: 1,
                      message: '创建成功'
                    })
                  })
                })
              }
            })
          }
        }
      })
    }
  }
}

exports.search_user_list = (req, res) => {
  if (req.body.role === 'teacher') {
    User.find({ role: 'teacher' }, { userName: 1, password: 1, _id: 0 }, function (err, doc) {
      res.send({
        teacherList: doc
      })
    })
  } else if (req.body.role === 'student') {
    User.find({ role: 'student' }, { userName: 1, password: 1, _id: 0 }, function (err, doc) {
      res.send({
        studentList: doc
      })
    })
  }
}

exports.class_control = (req, res, next) => {
  const { addRole, addName, nowClass } = req.body;
  if (addRole === 'class') {
    Class.find({ name: addName }, (err, doc) => {
      if (doc[0]) {
        res.json({
          type: 0,
          message: '该班级已经存在',
          addRole: 'class',
          classes: []
        })
      }
      else {
        const class_doc = new Class({
          _id: new mongoose.Types.ObjectId(),
          name: addName
        });
        class_doc
          .save()
          .then(result => {
            Class.find({}, { name: 1, _id: 0 }, function (err, doc) {
              var classes_array = doc.map(item => {
                return item.name;
              })
              res.json({
                type: 1,
                message: '添加班级成功',
                addRole: 'class',
                classes: classes_array
              })
            })
          })
          .catch(err => {
            console.log(err)
          })
      }
    })
  } else if (addRole === 'teacher') {
    Teacher.find({ name: addName }, (err, doc) => {
      if (doc[0]) {
        Teacher.find({ name: addName })
          .exec()
          .then(doc => {
            Class.find({ name: nowClass }, (err, doc_class) => {
              if (doc_class[0].teachers.indexOf(doc[0].name) !== -1) {
                res.json({
                  addRole: 'teacher',
                  nowClassTeacherList: [],
                  type: 0,
                  message: '该老师已经存在'
                })
              } else {
                Class.update({ name: nowClass }, { $push: { teachers: doc[0].name } })
                  .exec()
                  .then(() => {
                    Class.find({ name: nowClass })
                      .exec()
                      .then(doc => {
                        res.json({
                          addRole: 'teacher',
                          nowClassTeacherList: doc[0].teachers,
                          type: 1,
                          message: '添加老师成功'
                        })
                      })
                  })
              }
            })
          })
      } else {
        res.json({
          addRole: 'teacher',
          nowClassTeacherList: [],
          type: 0,
          message: '该老师不存在'
        })
      }
    })
  } else if (addRole === 'student') {
    Student.find({ name: addName }, (err, doc) => {
      if (doc[0]) {
        Student.find({ name: addName })
          .exec()
          .then(doc => {
            if (doc[0].class) {
              res.json({
                addRole: 'student',
                nowClassTeacherList: [],
                type: 0,
                message: '该同学已有班级'
              })
            } else {
              Class.find({ name: nowClass }, (err, doc_class) => {
                if (doc_class[0].classMates.indexOf(doc[0].name) !== -1) {
                  res.json({
                    addRole: 'student',
                    nowClassStudentList: [],
                    type: 0,
                    message: '该学生已经存在'
                  })
                } else {
                  Class.update({ name: nowClass }, { $push: { classMates: doc[0].name } })
                    .exec()
                    .then(() => {
                      Class.find({ name: nowClass })
                        .exec()
                        .then(doc => {
                          res.json({
                            type: 1,
                            message: '添加学生成功',
                            addRole: 'student',
                            nowClassStudentList: doc[0].classMates
                          })
                        })
                    })
                  Student.update({ name: addName }, { $set: { class: nowClass } })
                    .exec()
                }
              })
            }
          })
      } else {
        res.json({
          addRole: 'student',
          nowClassTeacherList: [],
          type: 0,
          message: '该学生不存在'
        })
      }
    })
  }
}

exports.get_classes = (req, res, next) => {
  Class.find({}, { name: 1, _id: 0 }, function (err, doc) {
    var classes_array = doc.map(item => {
      return item.name;
    })
    res.json({
      classes: classes_array
    })
  })
}

exports.get_class_info = (req, res, next) => {
  const { nowClass } = req.body;
  Class.find({ name: nowClass })
    .exec()
    .then(doc => {
      res.json({
        nowClassTeacherList: doc[0].teachers,
        nowClassStudentList: doc[0].classMates
      })
    })
}