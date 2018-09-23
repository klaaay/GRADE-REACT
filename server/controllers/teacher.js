const mongoose = require("mongoose");

var console = require('tracer').colorConsole();

const User = require("../models/User");
const Teacher = require("../models/Teacher");
const Student = require("../models/Student");
const Class = require("../models/Class");

exports.search_class_list = (req, res, next) => {
  console.log(req.body);
  const { id } = req.body;
  Teacher.find({ id: id })
    .exec()
    .then(doc => {
      console.log(doc)
      const name = doc[0].name;
      console.log(name);
      Class.find()
        .exec()
        .then(docs => {
          console.log(docs)
          var result = docs.map((item) => {
            if (item.teachers.indexOf(name) !== -1) {
              return item.name
            }
          })
          console.log(result);
          res.json({
            classList: result
          })
        })
    })
}

exports.publish_task = (req, res, next) => {
  console.log(req.body);
}