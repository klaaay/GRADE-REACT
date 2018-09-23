const mongoose = require('mongoose');

const adminSchema = mongoose.Schema({
  id: { type: mongoose.Schema.Types.ObjectId, ref: 'User' }
})

module.exports = mongoose.model('Admin',adminSchema)