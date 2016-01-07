var Competition = require("../models/competition");

function competitionsIndex(req,res) {
  Competition.find({}, function(err, competitions){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json(competitions);
  })
}

function competitionsShow(req,res) {
  var id = req.params.id;
  Competition.findOne({ _id: id }).populate('teams').exec(function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if (!competition) return res.status(404).json({ message: 'Competition not found'});
    return res.status(200).json(competition);
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
  Competition.findOneAndUpdate({_id: id}, req.body, function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    if (req.body.name) competition.name         = req.body.name;
    if (req.body.charity) competition.charity   = req.body.charity;
    if (req.body.target) competition.target     = req.body.target;
    if (req.body.deadline) competition.deadline = req.body.deadline;

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