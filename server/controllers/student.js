const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const Task = require("../models/Task")
const TaskDone = require("../models/TaskDone")

exports.get_tasks = (req, res, next) => {
  console.log(req.body);
  const { id } = req.body;
  // Student.find({ id: id })
  //   .exec()
  //   .then(doc => {
  //     console.log(doc)
  //     const my_class = doc[0].class;
  //     console.log(my_class);
  //     Task.find()
  //       .exec()
  //       .then(docs => {
  //         console.log(docs)
  //         var my_tasks = docs.map(item => {
  //           if (item.classes.indexOf(my_class) !== -1) {
  //             return item;
  //           }
  //         })
  //         console.log(my_tasks);
  //         var my_true_tasks = my_tasks.filter(item => {
  //           return !!item;
  //         })
  //         console.log(my_true_tasks);
  //         res.json({
  //           taskList: my_true_tasks
  //         })
  //       })
  //   })
  Student.find({id:id})
    .exec()
    .then(doc_stu=>{
      console.log(doc_stu[0].name);
      TaskDone.find({name:doc_stu[0].name})
        .populate('id')
        .exec()
        .then(docs_task=>{
          console.log(docs_task)
           res.json({
            taskList: docs_task
          })
        })
    })
}

exports.word_upload = (req,res,next)=>{
  console.log(req.body)
  console.log(req.file);
  const {userId,taskId} = req.body
  Student.find({id:userId})
    .exec()
    .then(doc=>{
      TaskDone.update({name:doc[0].name,id:taskId},{$set:{wordCommitted:true}}).exec()
      TaskDone.update({name:doc[0].name,id:taskId},{$set:{word:req.file.path}}).exec()
    })
}

exports.ppt_upload = (req,res,next)=>{
  console.log(req.file);
  const {userId,taskId} = req.body
  Student.find({id:userId})
    .exec()
    .then(doc=>{
      TaskDone.update({name:doc[0].name,id:taskId},{$set:{pptCommitted:true}}).exec()
      TaskDone.update({name:doc[0].name,id:taskId},{$set:{ppt:req.file.path}}).exec()
    })
}

exports.video_upload = (req,res,next)=>{
  console.log(req.file);
  const {userId,taskId} = req.body
  Student.find({id:userId})
    .exec()
    .then(doc=>{
      TaskDone.update({name:doc[0].name,id:taskId},{$set:{videoCommitted:true}}).exec()
      TaskDone.update({name:doc[0].name,id:taskId},{$set:{video:req.file.path}}).exec()
    })
}