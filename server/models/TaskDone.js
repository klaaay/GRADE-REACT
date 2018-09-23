const mongoose = require('mongoose');

const taskdoneSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  word: String,
  ppt: String,
  video: String,
  out_of_time: Boolean,
  committed: Boolean,
  commit_time: Date
})

module.exports = mongoose.model('TaskDone',taskdoneSchema)