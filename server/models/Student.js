const mongoose = require('mongoose');

const studentSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' },
  name:String,
  class: String
})

module.exports = mongoose.model('Student',studentSchema)