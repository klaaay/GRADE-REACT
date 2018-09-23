const mongoose = require('mongoose');

const classSchema = mongoose.Schema({
  _id: mongoose.Schema.Types.ObjectId,
  name: String,
  classMates: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Student' }],
  teachers: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Teacher' }]
})

module.exports = mongoose.model('Class',classSchema)