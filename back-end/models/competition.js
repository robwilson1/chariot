var mongoose = require('mongoose');

var competitionSchema = new mongoose.Schema({
  name: {type: String, required: true},
  charity: {type: String, required: true},
  competitors: [{type: mongoose.Schema.Types.ObjectId, ref: 'Competitor'}]
})

module.exports = mongoose.model('Competition', competitionSchema);