const mongoose = require('mongoose');

const evalRecord = mongoose.Schema({
  publisher: String,
  title: String,
  evaluator: String,
  evaluatorTo: String,
  score: Number,
  time: String
})

module.exports = mongoose.model('evalRecord', evalRecord)