const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  title: String,
  content: String,
  publish_time: Date,
  end_time: Date,
  Homework_done: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskDone' },
  done: Boolean,
})

module.exports = mongoose.model('Task',taskSchema)