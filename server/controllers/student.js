const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");
const Task = require("../models/Task")

exports.get_taks = (req, res, next) => {
  console.log(req.body);
  const { id } = req.body;
  Student.find({ id: id })
    .exec()
    .then(doc => {
      console.log(doc)
      const my_class = doc[0].class;
      console.log(my_class);
      Task.find()
        .exec()
        .then(docs => {
          console.log(docs)
          var my_tasks = docs.map(item => {
            if (item.classes.indexOf(my_class) !== -1) {
              return item;
            }
          })
          console.log(my_tasks);
          var my_true_tasks = my_tasks.filter(item => {
            return !!item;
          })
          console.log(my_true_tasks);
          res.json({
            taskList: my_true_tasks
          })
        })
    })
}