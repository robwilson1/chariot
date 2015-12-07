var mongoose = require('mongoose');

var competitorSchema = new mongoose.Schema({
  name: {type: String, required: true},
})

module.exports = mongoose.model('Competitor', competitorSchema);