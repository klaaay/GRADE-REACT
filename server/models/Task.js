const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  publisher: { type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' },
  classes: [String],
  title: String,
  content: String,
  publish_time: String,
  end_time: String,
  Homework_done: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskDone' }],
  done: Boolean,
})

module.exports = mongoose.model('Task',taskSchema)