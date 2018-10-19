const mongoose = require('mongoose');

const teacherSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name: String,
})

module.exports = mongoose.model('Teacher', teacherSchema)