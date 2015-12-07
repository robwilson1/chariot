angular
  .module("chariotApp")
  .controller("MainController", MainController);

MainController.$inject = ["Competition", "$state"];

function MainController(Competition, $state) {
  var self = this;

  self.competitions = Competition.query(function(data) {
    console.log(data[0]);
  });

  self.competition  = self.competitions[0];
  console.log(self.competitions);

  self.first = {};
  self.second = {};

  self.selectCompetiton = function() {
    self.competition = competition;
    console.log(self.competition);
  }

  self.viewCompetition = function(competition) {
    console.log(self.competition);
    $state.go('vote');
  }

  self.first.amount   = 12454;
  self.second.amount  = 8230;
  self.target         = 20000;
  self.total          = self.first.amount + self.second.amount;

  self.first.decimal  = self.first.amount/self.target;
  self.second.decimal = self.second.amount/self.target;

  self.first.percent  = self.first.decimal*100 + "%";
  self.second.percent = self.second.decimal*100 + "%";

  self.donate = function(team) {
    console.log(team);
  }
}