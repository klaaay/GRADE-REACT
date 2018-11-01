const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const Task = require("../models/Task");
const TaskDone = require("../models/TaskDone");
const EvaluateStand = require("../models/EvaluateStand")

const calcuGroupScore = (
  groupProportion,
  groupGrade,
  groupNumber) => {
  var toal_group_score = 0;
  for (let i = 0; i < groupGrade.length; i++) {
    toal_group_score += groupGrade[i].score
  }
  let total_group_score_real = toal_group_score * 1.0 / groupNumber;
  return total_group_score_real * groupProportion
}

const allReciverWithGroupNumberCreater = (allReciverArray, groupNumber) => {
  var allReciverArray_withGroup = allReciverArray
  while (groupNumber !== 1) {
    allReciverArray_withGroup = allReciverArray_withGroup.concat(allReciverArray);
    groupNumber = groupNumber - 1;
  }
  return allReciverArray_withGroup;
}

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
  const {
    publisherId,
    classes,
    title,
    content,
    publishTime,
    endTime,
    teacherProportion,
    selfProportion,
    groupProportion,
    groupNumber,
  } = req.body;
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
        var count = 0;
        var DontDoneNumber = 0;
        classes.forEach((item, index) => {
          Class.find({ name: item })
            .exec()
            .then(doc => {
              allRecievedStudentGroup = allRecievedStudentGroup.concat(doc[0].classMates)
              count = count + 1;
              DontDoneNumber += doc[0].classMates.length;
              if (count === classes.length) {
                allRecievedStudentGroup = allReciverWithGroupNumberCreater(allRecievedStudentGroup, groupNumber);
                var Task_doc = new Task({
                  _id: new mongoose.Types.ObjectId(),
                  publisherId: publisherId,
                  publisher: teacherName,
                  classes: classes,
                  title: title,
                  content: content,
                  publishTime: publishTime,
                  endTime: endTime,
                  teacherProportion: teacherProportion * 1.0 / 100,
                  selfProportion: selfProportion * 1.0 / 100,
                  groupProportion: groupProportion * 1.0 / 100,
                  groupNumber: groupNumber,
                  allRecievedStudentGroup: allRecievedStudentGroup,
                  DontDoneNumber: DontDoneNumber,
                  DoneNumber: 0
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
                  Teacher.find({ id: publisherId })
                    .exec()
                    .then(doc => {
                      const name = doc[0].name;
                      Task.find({ publisher: name }, { title: 1, publishTime: 1, classes: 1, DontDoneNumber: 1, DoneNumber: 1 }, (err, docs) => {
                        let docs_str = JSON.stringify(docs);
                        let docs_str_key = docs_str.replace(/_id/g, 'key');
                        let docs_key = JSON.parse(docs_str_key);
                        res.json({
                          publishedTasks: docs_key,
                          type: 1,
                          message: '发布成功'
                        })
                      })
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
      Task.find({ publisher: name }, { title: 1, publishTime: 1, classes: 1, DontDoneNumber: 1, DoneNumber: 1 }, (err, docs) => {
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
  TaskDone
    .find({ id: id })
    .populate('id')
    .exec()
    .then(docs => {
      var docs_str = JSON.stringify(docs);
      var docs_str_key = docs_str.replace(/_id/g, 'key');
      var docs_key = JSON.parse(docs_str_key);
      var ChartData = [];
      TaskDone
        .find({ id: id })
        .where('score')
        .exists(false)
        .then(doc_notEval => {
          ChartData.push(doc_notEval.length)
          TaskDone
            .find({ id: id })
            .where('score')
            .lt(60)
            .then(doc => {
              ChartData.push(doc.length)
              TaskDone
                .find({ id: id })
                .where('score')
                .gte(60)
                .lt(70)
                .then(doc => {
                  ChartData.push(doc.length)
                  TaskDone
                    .find({ id: id })
                    .where('score')
                    .gte(70)
                    .lt(90)
                    .then(doc => {
                      ChartData.push(doc.length)
                      TaskDone
                        .find({ id: id })
                        .where('score')
                        .gte(90)
                        .then(doc => {
                          ChartData.push(doc.length)
                          res.json({
                            data: docs_key,
                            ChartData: ChartData
                          })
                        })
                    })
                })
            })
        })
    })
}

exports.task_detail_chart = (req, res, next) => {
  const { id } = req.body;
  TaskDone
    .find({ id: id })
    .populate('id')
    .$where(function () {
      return (this.teacherGradeDone && this.selfGradeDone && this.groupGradeDone);
    })
    .select('teacherGrade selfGrade groupGrade name score')
    .exec()
    .then(docs => {
      var score_list = [];
      docs.forEach(item => {
        var temp = {};
        temp['师评'] = (item.teacherGrade * (item.id.teacherProportion)).toFixed(2);
        temp['自评'] = (item.selfGrade * (item.id.selfProportion)).toFixed(2);
        temp['组评'] = calcuGroupScore(item.id.groupProportion, item.groupGrade, item.id.groupNumber).toFixed(2);
        temp['总分'] = item.score;
        temp['姓名'] = item.name;
        score_list.push(temp);
      })
      score_list.sort((a, b) => {
        return b['总分'] - a['总分']
      })
      var categories = []
      var data_t = []
      var data_s = []
      var data_g = []

      score_list.forEach(item => {
        categories.push(item['姓名'] +'  ' +'<span style="font-weight:bold;color:#aaa">(' + item['总分'] + '分)</span>')
        data_t.push(parseFloat(item['师评']))
        data_s.push(parseFloat(item['自评']))
        data_g.push(parseFloat(item['组评']))
      })
      var series = [{
        name: '师评',
        data: data_t
      }, {
        name: '自评',
        data: data_s
      }, {
        name: '组评',
        data: data_g
      }]
      res.json({
        // score_list: score_list,
        categories: categories,
        series: series
      })
    })
}

exports.class_control = (req, res, next) => {
  const { selectClass, addUsers } = req.body;
  if (!selectClass || !addUsers) {
    res.send({
      type: 0,
      message: '请填写完整信息'
    })
  } else {
    var flag = 0;
    addUsers.forEach((item, index) => {
      flag = flag + 1;
      var user_doc = new User({
        _id: new mongoose.Types.ObjectId(),
        userName: item.userName,
        password: item.password,
        role: 'student'
      })
      User
        .find({ userName: item.userName })
        .exec()
        .then(docs => {
          if (docs[0]) {
            console.log('该用户已经存在')
          } else {
            user_doc
              .save(function (err, doc) {
                var student_doc = new Student({
                  id: user_doc._id,
                  name: item.name,
                  class: selectClass
                })
                student_doc
                  .save(function (err, doc) {
                    Class
                      .update({ name: selectClass }, { $push: { classMates: item.name } })
                      .exec()
                      .then(doc => {
                        console.log(doc)
                      })
                  })
              })
          }
        })
      if (flag === addUsers.length) {
        res.json({
          type: 1,
          message: '名单添加成功'
        })
      }
    })
  }
}

exports.get_class_list = (req, res, next) => {
  const { selectClass } = req.body;
  Class
    .find({ name: selectClass })
    .exec()
    .then(doc => {
      res.json({
        classMates: doc[0].classMates
      })
    })
}

exports.modify_stand = (req, res, next) => {
  const { owner, evalStand, initial_values } = req.body
  EvaluateStand
    .find({ owner: owner })
    .exec()
    .then(doc => {
      if (!doc[0]) {
        var EvaluateStand_doc = new EvaluateStand({
          owner: owner,
          stand: evalStand,
          initial_values: initial_values
        })
        EvaluateStand_doc
          .save(() => {
            res.json({
              type: 1,
              message: '保存修改成功',
            })
          })
      } else {
        EvaluateStand
          .update({ owner: owner }, { $set: { stand: evalStand, initial_values: initial_values } })
          .exec()
          .then(() => {
            res.json({
              type: 1,
              message: '保存修改成功',
            })
          })
      }
    })
}