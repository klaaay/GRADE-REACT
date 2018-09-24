
const User = require("../models/User");

exports.user_login = (req, res, next) => {
  var userName = req.body.userName;
  User.find({ userName: userName }, function (err, doc) {
    if (doc[0]) {
      console.log('userName success');
      var password = req.body.password;
      User.find({ userName: userName }, function (err, doc) {
        console.log(doc[0]);
        if (doc[0].password === password) {
          const role = doc[0].role;
          const id = doc[0]._id;
          console.log(id);
          console.log('password success');
          res.send({
            status: 'success',
            message: '登陆成功',
            role: role,
            id: id
          })
        } else {
          console.log('password failed');
          res.send({
            status: 'failed',
            message: '密码错误',
            role: '',
            id: ''
          })
        }
      })
    } else {
      console.log('not exists');
      res.send({
        status: 'failed',
        message: '账号不存在',
        role: '',
        id: ''
      })
    }
  })
}