const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  publisher: String,
  classes: [String],
  title: String,
  content: String,
  publishTime: String,
  endTime: String,
  teacherProportion: Number,
  selfProportion: Number,
  groupProportion: Number,
  groupNumber: Number,
  allRecievedStudentGroup: [String],
  DontDoneNumber: Number,
  DoneNumber: Number
})

module.exports = mongoose.model('Task', taskSchema)