const mongoose = require('mongoose');

const EvaluateStand = mongoose.Schema({
  owner:mongoose.Schema.Types.ObjectId,
  stand:{}
})

module.exports = mongoose.model('EvaluateStand', EvaluateStand);