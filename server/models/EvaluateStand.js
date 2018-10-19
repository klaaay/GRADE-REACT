const mongoose = require('mongoose');

const EvaluateStand = mongoose.Schema({
  data_instructional_design: [],
  data_multimedia: [],
  data_speech: [],
  data_class: [],
  initial_values: {}
})

module.exports = mongoose.model('EvaluateStand', EvaluateStand);