var mongoose = require('mongoose');

var competitionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  charity: {type: String, required: true},
  target: {type: Number, required: true},
  deadline: Date,
  teams: [{type: mongoose.Schema.Types.ObjectId, ref: 'Team'}]
})

module.exports = mongoose.model('Competition', competitionSchema);