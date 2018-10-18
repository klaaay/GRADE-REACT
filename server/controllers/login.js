
const User = require("../models/User");
const jwt = require("jsonwebtoken");

exports.user_login = (req, res, next) => {
  var userName = req.body.userName;
  User.find({ userName: userName }, function (err, doc) {
    if (doc[0]) {
      var password = req.body.password;
      User.find({ userName: userName }, function (err, doc) {
        if (doc[0].password === password) {
          const role = doc[0].role;
          const id = doc[0]._id;
          const token = jwt.sign({
            role: role,
            id: id
          },
            'secrect',
            {
              expiresIn: '1h'
            })
          res.send({
            status: 'success',
            message: '登陆成功',
            role: role,
            id: id,
            token: token
          })
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