const mongoose = require('mongoose');

const taskdoneSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  name: String,
  class: String,
  word: String,
  wordCommitted: Boolean,
  ppt: String,
  pptCommitted: Boolean,
  video: String,
  videoCommitted: Boolean,
  teacherGradeDetail: [],
  teacherGrade: Number,
  teacherGradeDone: Boolean,
  selfGradeDetail: [],
  selfGrade: Number,
  selfGradeDone: Boolean,
  groupMember: [String],
  groupGradeDetail: [{}],
  groupGrade: Number
})

module.exports = mongoose.model('TaskDone', taskdoneSchema)