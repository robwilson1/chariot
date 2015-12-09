var Competition = require("../models/competition");
var Team  = require("../models/team");

function teamsIndex(req,res) {
  Team.find({}, function(err, teams){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    return res.status(200).json(teams);
  });
}

function teamsShow(req,res) {
  var id = req.params.id;
  Team.findOne({_id: id}, function(err, team){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    if(!team) return res.status(404).json({ message: 'Team not found.' });
    return res.status(200).json(team);
  });
}

function teamsCreate(req,res) {
  var competitionId = req.body.competition_id;
  Competition.findOne({_id: competitionId}, function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    var newTeam = new Team(req.body);

    if (competition.teams.length >= 2) {
      return  res.status(500).json({ message: 'Maximum teams already reached' });
    } else {
      newTeam.save(function(err, team){
        if (err) return res.status(500).json({ message: 'Something went wrong.' });

        competition.teams.push(team);

        competition.save(function(err){
          if (err) return res.status(500).json({ message: 'Something went wrong.' });
          return res.status(201).json({ message: "Team created", team: team });
        });
      });
    }
  });
}

function teamsUpdate(req,res) {
  var id = req.params.id;
  Team.findOneAndUpdate({ _id: id }, req.body, function(err, team){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });
    console.log(req.body);
    console.log(team);
    if (req.body.name) team.name     = req.body.name;
    if (req.body.amount) team.amount = req.body.amount;

    team.save(function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong.' });
      return res.status(200).json({ message: 'team succesfully updated.', team: team });
    });
  });
}

function teamsDelete(req,res) {
  var competitionId = req.body.competition_id;
  var id            = req.params.id;

  Competition.findOne({_id: competitionId}, function(err, competition){
    if (err) return res.status(500).json({ message: 'Something went wrong.' });

    var teamIndex = competition.teams.indexOf('id');
    competition.teams.splice(teamIndex, 1);

    Team.findOneAndRemove({_id: id}, function(err){
      if (err) return res.status(500).json({ message: 'Something went wrong.' });

      competition.save(function(err, competition){
        if (err) return res.status(500).json({ message: 'Something went wrong.' });
        return res.status(201).json({ message: 'Team succesfully deleted'});
      });
    });
  });
}

module.exports = {
  teamsIndex:  teamsIndex,
  teamsShow:   teamsShow,
  teamsCreate: teamsCreate,
  teamsUpdate: teamsUpdate,
  teamsDelete: teamsDelete
}
