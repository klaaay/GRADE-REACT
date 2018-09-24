const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");


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