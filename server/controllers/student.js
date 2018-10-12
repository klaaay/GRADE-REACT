const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const Task = require("../models/Task")
const TaskDone = require("../models/TaskDone")

exports.get_tasks = (req, res, next) => {
  const { id } = req.body;
  Student.find({ id: id })
    .exec()
    .then(doc_stu => {
      TaskDone.find({ name: doc_stu[0].name })
        .populate('id')
        .exec()
        .then(docs_task => {
          res.json({
            taskList: docs_task
          })
        })
    })
}

exports.get_asked_tasks = (req, res, next) => {
  console.log(req.body)
  const { id } = req.body;
  Student.find({ id: id })
    .exec()
    .then(doc => {
      let name = doc[0].name
      console.log(name)
      TaskDone
        .where('groupMember')
        .elemMatch({ $eq: name })
        .exec()
        .then(docs => {
          let docs_str = JSON.stringify(docs);
          let docs_str_key = docs_str.replace(/_id/g, 'key');
          let docs_key = JSON.parse(docs_str_key);
          res.json({
            askedTaskList: docs_key
          })
        })
    })
}

exports.get_initial_task_info = (req, res, next) => {
  const { _id } = req.body;
  console.log(_id);
  TaskDone.find({ _id: _id })
    .exec()
    .then((doc) => {
      res.json({
        data: doc[0]
      })
    })
}

exports.word_upload = (req, res, next) => {
  console.log(req.body)
  const { id, userId, taskId, action } = req.body
  if (action === 'save') {
    TaskDone.update({ _id: id }, { $set: { word: req.file.path } }).exec()
      .then(() => {
        res.json({
          message: 'Word保存成功'
        })
      })
  }
  else if (action === 'commit') {
    TaskDone.update({ _id: id }, { $set: { wordCommitted: true } })
      .exec()
      .then(() => {
        res.json({
          message: 'Word提交成功'
        })
        TaskDone.find({ _id: id })
          .populate('id')
          .exec()
          .then(doc => {
            if (doc[0].wordCommitted && doc[0].pptCommitted && doc[0].videoCommitted) {
              var allRecievedStudentGroup = doc[0].id.allRecievedStudentGroup
              var groupMember = []
              console.log(allRecievedStudentGroup)
              Student.find({ id: userId })
                .exec()
                .then(doc => {
                  let now_stu = doc[0].name;
                  while (true) {
                    if (allRecievedStudentGroup[allRecievedStudentGroup.length - 1] !== now_stu && !(groupMember.includes(allRecievedStudentGroup[allRecievedStudentGroup.length - 1]))) {
                      groupMember.push(allRecievedStudentGroup.pop());
                      if (groupMember.length >= 2 || allRecievedStudentGroup.length === 0) {
                        console.log(allRecievedStudentGroup)
                        Task.update({ _id: taskId }, { $set: { allRecievedStudentGroup: allRecievedStudentGroup } }).exec()
                        console.log(groupMember)
                        TaskDone.update({ _id: id }, { $set: { groupMember: groupMember } }).exec()
                        break;
                      }
                    } else {
                      allRecievedStudentGroup = allRecievedStudentGroup.sort((a, b) => Math.random() > .5 ? -1 : 1)
                    }
                  }
                })
            }
          })
      })
  }
}


exports.ppt_upload = (req, res, next) => {
  const { id, userId, taskId, action } = req.body
  if (action === 'save') {
    TaskDone.update({ _id: id }, { $set: { ppt: req.file.path } }).exec()
      .then(() => {
        res.json({
          message: 'PPT保存成功'
        })
      })
  }
  else if (action === 'commit') {
    TaskDone.update({ _id: id }, { $set: { pptCommitted: true } })
      .exec()
      .then(() => {
        res.json({
          message: 'PPT提交成功'
        })
        TaskDone.find({ _id: id })
          .populate('id')
          .exec()
          .then(doc => {
            if (doc[0].wordCommitted && doc[0].pptCommitted && doc[0].videoCommitted) {
              var allRecievedStudentGroup = doc[0].id.allRecievedStudentGroup
              var groupMember = []
              console.log(allRecievedStudentGroup)
              Student.find({ id: userId })
                .exec()
                .then(doc => {
                  let now_stu = doc[0].name;
                  while (true) {
                    if (allRecievedStudentGroup[allRecievedStudentGroup.length - 1] !== now_stu && !(groupMember.includes(allRecievedStudentGroup[allRecievedStudentGroup.length - 1]))) {
                      groupMember.push(allRecievedStudentGroup.pop());
                      if (groupMember.length >= 2 || allRecievedStudentGroup.length === 0) {
                        console.log(allRecievedStudentGroup)
                        Task.update({ _id: taskId }, { $set: { allRecievedStudentGroup: allRecievedStudentGroup } }).exec()
                        console.log(groupMember)
                        TaskDone.update({ _id: id }, { $set: { groupMember: groupMember } }).exec()
                        break;
                      }
                    } else {
                      allRecievedStudentGroup = allRecievedStudentGroup.sort((a, b) => Math.random() > .5 ? -1 : 1)
                    }
                  }
                })
            }
          })
      })
  }
}

exports.video_upload = (req, res, next) => {
  const { id, userId, taskId, action } = req.body
  if (action === 'save') {
    TaskDone.update({ _id: id }, { $set: { video: req.file.path } }).exec()
      .then(() => {
        res.json({
          message: 'Video保存成功'
        })
      })
  }
  else if (action === 'commit') {
    TaskDone.update({ _id: id }, { $set: { videoCommitted: true } })
      .exec()
      .then(() => {
        res.json({
          message: 'Video提交成功'
        })
        TaskDone.find({ _id: id })
          .populate('id')
          .exec()
          .then(doc => {
            if (doc[0].wordCommitted && doc[0].pptCommitted && doc[0].videoCommitted) {
              var allRecievedStudentGroup = doc[0].id.allRecievedStudentGroup
              var groupNumber = doc[0].id.groupNumber
              var groupMember = []
              console.log(allRecievedStudentGroup)
              Student.find({ id: userId })
                .exec()
                .then(doc => {
                  let now_stu = doc[0].name;
                  while (true) {
                    if (allRecievedStudentGroup[allRecievedStudentGroup.length - 1] !== now_stu && !(groupMember.includes(allRecievedStudentGroup[allRecievedStudentGroup.length - 1]))) {
                      groupMember.push(allRecievedStudentGroup.pop());
                      if (groupMember.length >= groupNumber || allRecievedStudentGroup.length === 0) {
                        console.log(allRecievedStudentGroup)
                        Task.update({ _id: taskId }, { $set: { allRecievedStudentGroup: allRecievedStudentGroup } }).exec()
                        console.log(groupMember)
                        TaskDone.update({ _id: id }, { $set: { groupMember: groupMember } }).exec()
                        break;
                      }
                    } else {
                      allRecievedStudentGroup = allRecievedStudentGroup.sort((a, b) => Math.random() > .5 ? -1 : 1)
                    }
                  }
                })
            }
          })
      })
  }
}