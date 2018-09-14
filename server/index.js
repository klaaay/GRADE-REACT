const express = require('express');
const path = require('path');
var bodyParser = require('body-parser')
var console = require('tracer').colorConsole();

const app = express();
const server = require('http').createServer(app);
const port = process.env.PORT || 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

var mongoose = require('./schema/').mongoose;
var schema = require('./schema/')
// var user = mongoose.model('user', schema.user);
// var user_doc = new user({
//   userName: 'admin',
//   password: '123456',
//   role: 'admin'
// })
// user_doc.save(function (error, doc) {
//   if (error) {
//     console.log("error :" + error);
//   } else {
//     console.log(doc);
//   }
// })

app.post('/login', (req, res) => {
  var userName = req.body.userName;
  console.log(userName);
  var user = mongoose.model('user', schema.user);
  user.find({ userName: userName }, function (err, doc) {
    if (doc[0]) {
      console.log('userName success');
      var password = req.body.password;
      user.find({ password: password }, { role: 1 }, function (err, doc) {
        if (doc[0]) {
          const role = doc[0].role;
          console.log(role);
          console.log('password success');
          res.send({
            status: 'success',
            message: '登陆成功',
            role: role
          })
        } else {
          console.log('password failed');
          res.send({
            status: 'failed',
            message: '密码错误',
            role:''
          })
        }
      })
    } else {
      console.log('not exists');
      res.send({
        status: 'failed',
        message: '账号不存在',
        role:''
      })
    }
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));