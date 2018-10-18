const mongoose = require('mongoose');

const taskdoneSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'Task' },
  name: String,
  class: String,
  word: String,
  wordCommitted: { type: Boolean, default: false },
  ppt: String,
  pptCommitted: { type: Boolean, default: false },
  video: String,
  videoCommitted: { type: Boolean, default: false },
  teacherGradeDetail: {},
  teacherGrade: Number,
  teacherGradeDone: { type: Boolean, default: false },
  selfGradeDetail: {},
  selfGrade: Number,
  selfGradeDone: { type: Boolean, default: false },
  groupMemberOrigin:[String],
  groupMember: [String],
  groupGradeDetail: [{}],
  groupGrade: [{}],
  groupGradeDone: { type: Boolean, default: false },
  score:Number
})

module.exports = mongoose.model('TaskDone', taskdoneSchema)