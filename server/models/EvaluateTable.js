const mongoose = require('mongoose');

const EvaluateTable = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'TaskDone' },
  name: String,
  EvaluateDetails: [{}],
  score: Number,
  done: Boolean
})

module.exports = mongoose.model('EvaluateTable', EvaluateTable)