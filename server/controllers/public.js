const mongoose = require("mongoose");
const dayjs = require("dayjs")

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const TaskDone = require("../models/TaskDone")
const EvalRecord = require("../models/EvalRecord")
const EvaluateStand = require("../models/EvaluateStand")

const evaluateStand_val = require("../models/evaluateStand_val")


const calcuScore = (
  teacherProportion,
  teacherGrade,
  selfProportion,
  selfGrade,
  groupProportion,
  groupGrade,
  groupNumber) => {
  var toal_group_score = 0;
  for (let i = 0; i < groupGrade.length; i++) {
    toal_group_score += groupGrade[i].score
  }
  let total_group_score_real = toal_group_score * 1.0 / groupNumber;
  return teacherProportion * teacherGrade + selfProportion * selfGrade + total_group_score_real * groupProportion
}


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

exports.get_initial_evaluate_stand = (req, res, next) => {
  // var EvaluateStand_doc = new EvaluateStand({
  //   data_instructional_design: evaluateStand_val.data_instructional_design,
  //   data_multimedia: evaluateStand_val.data_multimedia,
  //   data_speech: evaluateStand_val.data_speech,
  //   data_class: evaluateStand_val.data_class,
  //   initial_values: evaluateStand_val.inital_values
  // })
  // EvaluateStand_doc.save()
  EvaluateStand
    .find()
    .exec()
    .then(doc => {
      console.log(doc)
      res.json({
        evalStand: doc[0]
      })
    })
}

exports.get_initial_evaluate_state = (req, res, next) => {
  const { id, role, userId } = req.body;
  if (role === 'teacher') {
    TaskDone
      .find({ _id: id })
      .select('teacherGradeDetail teacherGradeDone')
      .exec()
      .then(doc => {
        res.json({
          data: doc[0],
          role: 'teacher'
        })
      })
  } else if (role === 'self') {
    TaskDone
      .find({ _id: id })
      .select('selfGradeDetail selfGradeDone')
      .exec()
      .then(doc => {
        res.json({
          data: doc[0],
          role: 'self'
        })
      })
  } else if (role === 'group') {
    TaskDone
      .find({ _id: id })
      .select('groupGradeDetail')
      .exec()
      .then(doc => {
        res.json({
          data: doc[0],
          role: 'group'
        })
      })

  }
}

exports.score_evaluate_save = (req, res, next) => {
  const { details, id, role, userId } = req.body;
  if (role === 'teacher') {
    TaskDone
      .update({ _id: id }, { $set: { teacherGradeDetail: details } })
      .exec()
      .then(() => {
        res.json({
          type: 1,
          message: '保存成功'
        })
      })
  } else if (role === 'self') {
    TaskDone
      .update({ _id: id }, { $set: { selfGradeDetail: details } })
      .exec()
      .then(() => {
        res.json({
          type: 1,
          message: '保存成功'
        })
      })
  } else if (role === 'group') {
    let groupDetails = {};
    groupDetails['userId'] = userId;
    groupDetails['details'] = details;
    TaskDone
      .update({ _id: id }, { $push: { groupGradeDetail: groupDetails } })
      .exec()
      .then(() => {
        res.json({
          type: 1,
          message: '保存成功'
        })
      })
  }
}

exports.score_evaluate = (req, res, next) => {
  const { id, role, score, details } = req.body;
  if (role === 'teacher') {
    TaskDone.update({ _id: id }, { $set: { teacherGradeDetail: details } }).exec()
    TaskDone.update({ _id: id }, { $set: { teacherGrade: score } }).exec()
    TaskDone
      .update({ _id: id }, { $set: { teacherGradeDone: true } })
      .exec()
      .then(() => {
        res.json({
          type: 1,
          message: '评价成功(教师)'
        })
      })
    TaskDone
      .find({ _id: id })
      .populate('id')
      .exec()
      .then(doc => {
        if (doc[0].teacherGradeDone && doc[0].selfGradeDone && doc[0].groupGradeDone) {
          let score = calcuScore(
            doc[0].id.teacherProportion,
            doc[0].teacherGrade,
            doc[0].id.selfProportion,
            doc[0].selfGrade,
            doc[0].id.groupProportion,
            doc[0].groupGrade,
            doc[0].id.groupNumber
          )
          TaskDone.update({ _id: id }, { $set: { score: score.toFixed(2) } }).exec()
        }
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
    TaskDone
      .find({ _id: id })
      .populate('id')
      .exec()
      .then(doc => {
        if (doc[0].teacherGradeDone && doc[0].selfGradeDone && doc[0].groupGradeDone) {
          let score = calcuScore(
            doc[0].id.teacherProportion,
            doc[0].teacherGrade,
            doc[0].id.selfProportion,
            doc[0].selfGrade,
            doc[0].id.groupProportion,
            doc[0].groupGrade,
            doc[0].id.groupNumber
          )
          TaskDone.update({ _id: id }, { $set: { score: score.toFixed(2) } }).exec()
        }
      })
  } else if (role === 'group') {
    const { userId } = req.body;

    Student
      .find({ id: userId })
      .exec()
      .then(doc => {
        let name = doc[0].name
        TaskDone.update({ _id: id }, { $pull: { groupMember: name } }).exec()
        let groupGrade = {};
        groupGrade['name'] = name;
        groupGrade['userId'] = userId;
        groupGrade['score'] = score;
        TaskDone.update({ _id: id }, { $push: { groupGrade: groupGrade } })
          .exec()
          .then(() => {
            res.json({
              type: 1,
              message: '评价成功(互评)'
            })
            TaskDone
              .find({ _id: id })
              .populate('id')
              .exec()
              .then(doc => {
                var EvalRecord_doc = new EvalRecord({
                  publisher: doc[0].id.publisher,
                  title: doc[0].id.title,
                  evaluator: userId,
                  evaluatorTo: doc[0].name,
                  score: score,
                  time: dayjs().format("YYYY-MM-DD")
                })
                EvalRecord_doc.save()
                if (doc[0].groupMember.length === 0) {
                  TaskDone.update({ _id: id }, { $set: { groupGradeDone: true } }).exec()
                    .then(() => {
                      TaskDone
                        .find({ _id: id })
                        .populate('id')
                        .exec()
                        .then(doc => {
                          if (doc[0].teacherGradeDone && doc[0].selfGradeDone && doc[0].groupGradeDone) {
                            let score = calcuScore(
                              doc[0].id.teacherProportion,
                              doc[0].teacherGrade,
                              doc[0].id.selfProportion,
                              doc[0].selfGrade,
                              doc[0].id.groupProportion,
                              doc[0].groupGrade,
                              doc[0].id.groupNumber
                            )
                            TaskDone.update({ _id: id }, { $set: { score: score.toFixed(2) } }).exec()
                          }
                        })
                    })
                }
              })
          })
      })
  }
}