var Competition = require("../models/competition");
var Competitor  = require("../models/competitor");

function competitorsIndex(req,res) {
  Competitor.find({}, function(err, competitors){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json({ competitors: competitors });
  });
}

function competitorsShow(req,res) {
  var id = req.params.id;
  Competitor.findOne({_id: id}, function(err, competitor){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if(!competitor) return res.status(404).json({ message: 'Competitor not found.' });
    return res.status(200).json({ competitor: competitor });
  });
}

function competitorsCreate(req,res) {
  var competitionId = req.body.competition_id;
  Competition.findOne({_id: competitionId}, function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    var newCompetitor = new Competitor(req.body);

    if (competition.competitors.length >= 2) {
      return  res.status(500).json({ message: 'Maximum competitors already reached' });
    } else {
      newCompetitor.save(function(err, competitor){
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        
        competition.competitors.push(competitor);

        competition.save(function(err){
          if (err) return res.status(500).json({ message: 'Something went wrong.' });
          return res.status(201).json({ message: "Competitor created", competitor: competitor });
        });
      });
    }
  });
}

function competitorsUpdate(req,res) {
  var id = req.params.id;
    Competitor.findOneAndUpdate({ _id: id }, req.body, function(err, competitor){
      if (err) return res.status(500).json({ message: 'Something went wrong.' });

      if (req.body.name) competitor.name = req.body.name;

      competitor.save(function(err){
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        return res.status(200).json({ message: 'Competitor succesfully updated.', competitor: competitor });
      });
    });
}

function competitorsDelete(req,res) {
  var competitionId = req.body.competition_id;
  var id            = req.params.id;

  Competition.findOne({_id: competitionId}, function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    var competitorIndex = competition.competitors.indexOf('id');
    competition.competitors.splice(competitorIndex, 1);

    Competitor.findOneAndRemove({_id: id}, function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong.' });

      competition.save(function(err, competition){
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        return res.status(201).json({ message: 'Competitor succesfully deleted'});  
      });
    });
  });
}

module.exports = {
  competitorsIndex:  competitorsIndex,
  competitorsShow:   competitorsShow,
  competitorsCreate: competitorsCreate,
  competitorsUpdate: competitorsUpdate,
  competitorsDelete: competitorsDelete
}