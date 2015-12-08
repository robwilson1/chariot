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
  };

  self.viewCompetition = function(competition) {
    console.log(self.competition);
    $state.go('vote');
  };

  self.title = "title";
  self.first = {};
  self.second = {};


  self.getFirst = function() {
    $.ajax({
      url: 'http://localhost:3000/api/teams/',
      type: 'GET',
    }).done(function(data) {
      self.first.amount = data[0].amount;
      self.first.name = data[0].name;
      self.second.amount = data[1].amount;
      self.second.name = data[1].name;

      self.target         = 20000;
      self.total          = self.first.amount + self.second.amount;

      self.first.decimal  = self.first.amount / self.target;
      self.second.decimal = self.second.amount / self.target;

      self.first.percent  = self.first.decimal * 100 + "%";
      self.second.percent = self.second.decimal * 100 + "%";

      console.log("[+] Team 1 decimal " + self.first.decimal);
      console.log("[+] Team 1 amount " + self.first.amount);
      console.log("[+] Team 1 % " + self.first.percent);
      console.log("[+] Team 2 decimal " + self.second.decimal);
      console.log("[+] Team 2 amount " + self.second.amount);
      console.log("[+] Team 2 percent " + self.second.percent);

      $('#graphic-one').html(
        '<figure>'+
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">'+
              '<linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">'+
                  '<stop offset="0%" stop-opacity="1" stop-color="#006A00"/>'+
                  '<stop offset="{{main.first.percent}}" stop-opacity="1" stop-color="#006A00">'+
                    '<animate attributeName="offset" values="0; {{main.first.decimal}};0" repeatCount="0.5" dur="5s" begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="{{main.first.percent}}" stop-opacity="0" stop-color="#006A00">'+
                    '<animate attributeName="offset" values="0;{{main.first.decimal}};0" repeatCount="0.5" dur="5s"  begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="100%" stop-opacity="0" stop-color="#006A00"/>'+
              '</linearGradient>'+
              '<circle cx="50" cy="50" r="30" fill="url(#lg)" stroke="black" stroke-width="4"/>'+
          '</svg>'+
        '</figure>'
      );

      $('#graphic-two').html(
        '<figure>'+
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">'+
              '<linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">'+
                  '<stop offset="0%" stop-opacity="1" stop-color="#006A00"/>'+
                  '<stop offset="{{main.second.percent}}" stop-opacity="1" stop-color="#006A00">'+
                    '<animate attributeName="offset" values="0; {{main.second.decimal}};0" repeatCount="0.5" dur="5s" begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="{{main.second.percent}}" stop-opacity="0" stop-color="#006A00">'+
                    '<animate attributeName="offset" values="0;{{main.second.decimal}};0" repeatCount="0.5" dur="5s"  begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="100%" stop-opacity="0" stop-color="#006A00"/>'+
              '</linearGradient>'+
              '<circle cx="50" cy="50" r="30" fill="url(#lg)" stroke="black" stroke-width="4"/>'+
          '</svg>'+
        '</figure>'
      );
    });
  };

  self.getFirst();

  self.donate = function(team) {
    console.log(team);
    $state.go('donate');
  };

  self.addCompetition = function() {
  if (self.competition._id) {
    Competition.update(self.competition, function() {
      self.viewCompetition(self.competition);
      self.competition = {};
    });
  } else {
    Competition.save(self.competition, function(competition) {
      self.competitions.push(competition);
      self.viewCompetition(self.competition);
      self.competition = {};
    });
  };

  // This is outside the callbacks, so will happen regardless of saving to the database

  self.viewCompetition(self.competition);
  };

  self.newCompetition = function() {
    $state.go('new');
  };
};
