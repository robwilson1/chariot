var mongoose = require('mongoose');

var teamSchema = new mongoose.Schema({
  name: {type: String, required: true},
  amount: Number
})

module.exports = mongoose.model('Team', teamSchema);