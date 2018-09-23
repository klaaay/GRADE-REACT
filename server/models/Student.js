const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:String,
  class: String,
  homeworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'TaskDone' }]
})

module.exports = mongoose.model('Student',studentSchema)