const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const Task = require("../models/Task");
const TaskDone = require("../models/TaskDone");

exports.search_class_list = (req, res, next) => {
  const { id } = req.body;
  Teacher.find({ id: id })
    .exec()
    .then(doc => {
      const name = doc[0].name;
      Class.find()
        .exec()
        .then(docs => {
          var result = docs.map((item) => {
            if (item.teachers.indexOf(name) !== -1) {
              return item.name
            }
          })
          var true_resut = result.filter(item => {
            return !!item;
          })
          res.json({
            classList: true_resut
          })
        })
    })
}

exports.publish_task = (req, res, next) => {
  const { publisherId, classes, title, content, publishTime, endTime } = req.body;
  if (!classes || !title || !content || !publishTime || !endTime) {
    res.json({
      type: 0,
      message: '请填写完整信息'
    })
  } else {
    Teacher.find({ id: publisherId })
      .exec()
      .then(doc => {
        var teacherName = doc[0].name;
        var allRecievedStudentGroup = [];
        classes.forEach(async (item, index) => {
          await Class.find({ name: item })
            .exec()
            .then(doc => {
              allRecievedStudentGroup = allRecievedStudentGroup.concat(doc[0].classMates)
              console.log(index)
              console.log(classes.length)
              console.log(allRecievedStudentGroup)
              if (index === (classes.length - 1)) {
                allRecievedStudentGroup = allRecievedStudentGroup.concat(allRecievedStudentGroup)
                var Task_doc = new Task({
                  _id: new mongoose.Types.ObjectId(),
                  publisher: teacherName,
                  classes: classes,
                  title: title,
                  content: content,
                  publishTime: publishTime,
                  endTime: endTime,
                  allRecievedStudentGroup: allRecievedStudentGroup
                })
                Task_doc.save(function (err, doc) {
                  classes.forEach(item_class => {
                    Class.find({ name: item_class }, (err, doc) => {
                      doc[0].classMates.forEach(item_name => {
                        var TaskDone_doc = new TaskDone({
                          id: Task_doc._id,
                          name: item_name,
                          class: item_class,
                          wordCommitted: false,
                          pptCommitted: false,
                          videoCommitted: false
                        })
                        TaskDone_doc.save(() => { })
                      })
                    })
                  })
                  res.json({
                    type: 1,
                    message: '发布成功'
                  })
                })
              }
            })
        })
      })
  }
}

exports.published_task = (req, res, next) => {
  const { id } = req.body;
  Teacher.find({ id: id })
    .exec()
    .then(doc => {
      const name = doc[0].name;
      Task.find({ publisher: name }, { title: 1, publishTime: 1, classes: 1 }, (err, docs) => {
        let docs_str = JSON.stringify(docs);
        let docs_str_key = docs_str.replace(/_id/g, 'key');
        let docs_key = JSON.parse(docs_str_key);
        res.json({
          publishedTasks: docs_key
        })
      })
    })
}

exports.deleted_task = (req, res, next) => {
  const { id } = req.body;
  TaskDone.remove({ id: id }).exec();
  Task.remove({ _id: id })
    .exec()
    .then(() => {
      res.json({
        message: '删除成功'
      })
    })
}

exports.task_detail = (req, res, next) => {
  const { id } = req.body;
  TaskDone.find({ id: id })
    .exec()
    .then(docs => {
      let docs_str = JSON.stringify(docs);
      let docs_str_key = docs_str.replace(/_id/g, 'key');
      let docs_key = JSON.parse(docs_str_key);
      res.json({
        data: docs_key
      })
    })
}