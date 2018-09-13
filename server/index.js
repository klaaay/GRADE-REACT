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

app.post('/login', (req, res) => {
  var userName = req.body.userName;
  console.log(userName);
  var admin = mongoose.model('admin', schema.admin);
  admin.find({ userName: userName }, function (err, doc) {
    if (doc[0]) {
      console.log('userName success');
      var password = req.body.password;
      admin.find({ password: password }, function (err, doc) {
        if (doc[0]) {
          console.log('password success');
          res.send({
            status: true,
            message: '登陆成功'
          })
        } else {
          console.log('password failed');
          res.send({
            status: false,
            message: '密码错误'
          })
        }
      })
    } else {
      console.log('not exists');
      res.send({
        status: false,
        message: '账号不存在'
      })
    }
  })
})

server.listen(port, () => console.log(`Listening on port ${port}`));