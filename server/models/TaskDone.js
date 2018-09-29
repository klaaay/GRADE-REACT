const mongoose = require('mongoose');

const taskdoneSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  name: String,
  class:String,
  word: String,
  wordCommitted: Boolean,
  ppt: String,
  pptCommitted: Boolean,
  video: String,
  videoCommitted: Boolean,
  teacherGrade:Number,
  groupMember:[String],
  groupGrade:Number,
  selfGrade:Number
})

module.exports = mongoose.model('TaskDone', taskdoneSchema)