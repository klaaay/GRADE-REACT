const mongoose = require('mongoose');

const EvaluateStand = mongoose.Schema({
  owner:mongoose.Schema.Types.ObjectId,
  stand:{},
  initial_values:{}
})

module.exports = mongoose.model('EvaluateStand', EvaluateStand);