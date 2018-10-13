const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const TaskDone = require("../models/TaskDone")


exports.change_password = (req, res) => {
  var userName = req.body.userName;
  var relOld = req.body.relOld;
  var oldPass = req.body.oldPass;
  var newPass = req.body.newPass;
  var reNewPass = req.body.reNewPass;
  if (!oldPass || !newPass || !reNewPass) {
    res.send({
      type: 0,
      message: '请填写完整信息'
    })
  } else {
    if (relOld !== oldPass) {
      res.send({
        type: 0,
        message: '原密码错误'
      })
    } else {
      if (newPass === oldPass) {
        res.send({
          type: 0,
          message: '新密码不能与原密码相同'
        })
      } else {
        if (newPass !== reNewPass) {
          res.send({
            type: 0,
            message: '输入两次密码不一致'
          })
        } else {
          User.update({ userName: userName }, { $set: { password: newPass } }).exec();
          res.send({
            type: 1,
            message: '密码修改成功'
          })
        }
      }
    }
  }
}

exports.get_initial_evaluate_state = (req,res,next)=>{
  console.log(req.body);
  const {id,role,userId} = req.body;
  if(role === 'teacher'){
    TaskDone.find({_id:id})
      .select('teacherGradeDetail teacherGradeDone')
      .exec()
      .then(doc=>{
        res.json({
          data:doc[0]
        })
      })
  }
}

exports.score_evaluate_save = (req, res, next) => {
  console.log(req.body);
  const { details, id, role } = req.body;
  if (role === 'teacher') {
    TaskDone.update({ _id: id }, { $set: { teacherGradeDetail: details } })
      .exec()
      .then(()=>{
        res.json({
          type:1,
          message:'保存成功'
        })
      })
  }else if (role === 'self'){
    TaskDone.update({ _id: id }, { $set: { selfGradeDetail: details } })
      .exec()
      .then(()=>{
        res.json({
          type:1,
          message:'保存成功'
        })
      })
  }
}

exports.score_evaluate = (req, res, next) => {
  console.log(req.body);
  const { id, role, score,details } = req.body;
  if (role === 'teacher') {
    TaskDone.update({ _id: id }, { $set: { teacherGradeDetail: details } }).exec()
    TaskDone.update({ _id: id }, { $set: { teacherGrade: score } }).exec()
    TaskDone.update({ _id: id }, { $set: { teacherGradeDone: true } })
      .exec()
      .then(() => {
        res.json({
          type: 1,
          message: '评价成功(教师)'
        })
      })
  } else if (role === 'self') {
    TaskDone.update({ _id: id }, { $set: { selfGradeDetail: details } }).exec()
    TaskDone.update({ _id: id }, { $set: { selfGrade: score } }).exec()
    TaskDone.update({ _id: id }, { $set: { selfGradeDone: true } })
      .exec()
      .then(() => {
        res.json({
          type: 1,
          message: '评价成功(自评)'
        })
      })
  } else if (role === 'group') {
    console.log('group')
    console.log(req.body.userId)
    const { userId } = req.body;
    Student.find({ id: userId })
      .exec()
      .then(doc => {
        let name = doc[0].name
        TaskDone.update({ _id: id }, { $pull: { groupMember: name } }).exec()
      })
    TaskDone.update({ _id: id }, { $push: { groupGrade: score } })
      .exec()
      .then(() => {
        res.json({
          type: 1,
          message: '评价成功(互评)'
        })
      })
  }
}