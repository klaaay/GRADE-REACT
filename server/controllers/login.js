
const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const jwt = require("jsonwebtoken");

exports.user_login = (req, res, next) => {
  var userName = req.body.userName;
  console.log(req.body)
  User.find({ userName: userName }, function (err, doc) {
    if (doc[0]) {
      var password = req.body.password;
      User.find({ userName: userName }, function (err, doc) {
        if (doc[0].password === password) {
          const role = doc[0].role;
          const id = doc[0]._id;
          let name = "";
          const token = jwt.sign({
            role: role,
            id: id
          },
            'secrect',
            {
              expiresIn: '1h'
            })
          if (role === 'admin') {
            name = "管理员"
            res.send({
              status: 'success',
              message: '登陆成功',
              role: role,
              id: id,
              name: name,
              token: token
            })
          } else if (role === 'teacher') {
            Teacher
              .find({ id: id })
              .exec()
              .then(doc => {
                name = doc[0].name
                res.send({
                  status: 'success',
                  message: '登陆成功',
                  role: role,
                  id: id,
                  name: name,
                  token: token
                })
              })
          } else if (role === "student") {
            Student
              .find({ id: id })
              .exec()
              .then(doc => {
                name = doc[0].name
                res.send({
                  status: 'success',
                  message: '登陆成功',
                  role: role,
                  id: id,
                  name: name,
                  token: token
                })
              })
          }
        } else {
          res.send({
            status: 'failed',
            message: '密码错误',
            role: '',
            id: ''
          })
        }
      })
    } else {
      res.send({
        status: 'failed',
        message: '账号不存在',
        role: '',
        id: ''
      })
    }
  })
}