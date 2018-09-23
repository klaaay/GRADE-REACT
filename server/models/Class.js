const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  classMates: [String],
  teachers: [String]
})

module.exports = mongoose.model('Class',classSchema)