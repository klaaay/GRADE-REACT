const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
  classes: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Class' }],
  homeworks: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Task' }]
})

module.exports = mongoose.model('Teacher', teacherSchema)