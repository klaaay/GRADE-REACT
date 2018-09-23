const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  class: { type: mongoose.Schema.Types.ObjectId, ref: 'Class' },
  homeworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskDone' }]
})

module.exports = mongoose.model('Student',studentSchema)