angular
  .module("chariotApp")
  .controller("MainController", MainController);

MainController.$inject = ["Competition", "$state"];

function MainController(Competition, $state) {
  var self = this;

  self.competition;
  self.team1;
  self.team2;

  self.competitions = getCompetitions;

  function getCompetitions() {
    Competition.query(function(data) {
      self.competition = data[0];
      // self.team1 = self.competition.teams[0];
      // self.team2 = self.competition.teams[1];
    });
  }
  
  $.when(getCompetitions()).then(function(data) {
    console.log(data)
  });


 



  self.viewCompetition = function(competition) {
    $state.go('vote');
  }

  // self.team1.amount   = 12454;
  // self.team2.amount   = 8230;
  // self.target         = 20000;
  // self.total          = self.team1.amount + self.team2.amount;

  // self.team1.decimal  = self.team1.amount/self.target;
  // self.team2.decimal = self.team2.amount/self.target;

  // self.team1.percent  = self.team1.decimal*100 + "%";
  // self.team2.percent = self.team2.decimal*100 + "%";

  self.donate = function(team) {
    console.log(team);
  }
}