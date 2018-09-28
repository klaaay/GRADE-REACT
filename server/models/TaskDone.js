const mongoose = require('mongoose');

const taskdoneSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  studentName:String,
  word: String,
  ppt: String,
  video: String,
  committed: Boolean,
  commitTime: String
})

module.exports = mongoose.model('TaskDone',taskdoneSchema)