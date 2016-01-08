var mongoose = require('mongoose');
var config   = require('./config');

mongoose.connect(config.database);

var Team = require("../models/team");
var Competition = require("../models/competition");

var team1 = new Team({
  name: "Array",
  amount: 20
})

team1.save(function(err, team) {
 if (err) return console.log(err);
 console.log("Team saved! ", team);
})

var team2 = new Team({
  name: "Boolean",
  amount: 40
})

team2.save(function(err, team) {
 if (err) return console.log(err);
 console.log("Team saved! ", team);
})

var competition1 = new Competition({
  name: "GA Food",
  charity: "Trussel Trust",
  target: "200",
  deadline: "12.25.2015",
  teams: [team1, team2]
})

competition1.save(function(err, competition) {
 if (err) return console.log(err);
 console.log("Comp saved! ", competition);
})
