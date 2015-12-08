angular
  .module("chariotApp")
  .controller("MainController", MainController);

MainController.$inject = ["Competition", "$state"];

function MainController(Competition, $state) {
  var self = this;

  self.competitions = Competition.query();
  console.log(self.competitions);

  self.competition  = {};

  self.selectCompetiton = function() {
    self.competition = competition;
  }

  self.viewCompetition = function(competition) {
    console.log(self.competition);
    $state.go('vote');
  };

  self.title = "title";

  self.first = {};
  self.second = {};









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
    $state.go('donate')
  };

  self.addCompetition = function() {
    if (self.competition._id) {
      Competition.update(self.competition, function(){
        self.viewCompetition(self.competition);
        self.competition = {};
      });
    } else {
      Competition.save(self.competition, function(competition) {
        self.competitions.push(competition);
        self.viewCompetition(self.competition);
        self.competition = {};
      });
    }
    // This is outside the callbacks, so will happen regardless of saving to the database
    self.viewCompetition(self.competition);
  }
  
  self.newCompetition = function() {
    $state.go('new');
  };

};
