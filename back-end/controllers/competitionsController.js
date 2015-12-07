var Competition = require("../models/competition");

function competitionsIndex(req,res) {
  Competition.find({}, function(err, competitions){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ competitions: competitions });
  })
}

function competitionsShow(req,res) {
  var id = req.params.id;
  Compeitition.findOne({ _id: id }).poplulate('competitors').exec(function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!competition) return res.status(404).json({ message: 'Competiton not found'});
    return res.status(200).json({ competition: competition });
  })
}

function competitionsCreate(req,res) {
  var newCompetition = new Competition(req.body);

  newCompetition.save(function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(201).json({ message: 'Competition created.', competition: competition });
  })
}

function competitionsUpdate(req,res) {
  var id = req.params.id;
  Competition.findOneAndUpdate({ _id: id }, req.body, function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!competition) return res.status(404).json({ message: 'Competiton not found'});

    if (req.body.name) competition.name = competition.name;
    if (req.body.name) competition.charity = competition.charity;

    competition.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      return res.status(200).json({ message: 'Competition succesfully updated.', competition: competition });
    })
  })
}

function competitionsDelete(req,res) {
  var id = req.params.id;
  Competition.findAndRemove({ _id: id }, function(err){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ message: 'Competition succesfully deleted' });
  })
}


module.exports = {
  competitionsIndex:  competitionsIndex,
  competitionsShow:   competitionsShow,
  competitionsCreate: competitionsCreate,
  competitionsUpdate: competitionsUpdate,
  competitionsDelete: competitionsDelete
}