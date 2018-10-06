const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  publisher: String,
  classes: [String],
  title: String,
  content: String,
  publishTime: String,
  endTime: String,
  // Homework_done: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskDone' }],
  // allDone: Boolean,
  allRecievedStudentGroup: [String]
})

module.exports = mongoose.model('Task', taskSchema)