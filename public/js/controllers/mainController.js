angular
  .module('chariotApp')
  .controller('MainController', MainController);

MainController.$inject = ['Competition', '$state', 'API'];

function MainController(Competition, $state, API) {
  var self = this;

  self.competitions = Competition.query();

  self.competition  = {};

  self.selectCompetiton = function() {
    self.competition = competition;
  };

  self.viewCompetition = function(competition) {
    $state.go('vote');
  };

  self.title = "title";
  self.first = {};
  self.second = {};


  self.getTeams = function() {
    $.ajax({
      url: API+'/teams/',
      type: 'GET',
    }).done(function(data) {
      self.first.amount = data[0].amount;
      self.first.name = data[0].name;
      self.first.id = data[0]._id;
      self.second.amount = data[1].amount;
      self.second.name = data[1].name;
      self.second.id = data[1]._id;

      self.target         = 500;
      self.total          = self.first.amount + self.second.amount;

      self.first.decimal  = self.first.amount / self.target;
      self.second.decimal = self.second.amount / self.target;

      self.first.percent  = self.first.decimal * 100 + "%";
      self.second.percent = self.second.decimal * 100 + "%";

      $('#graphic-one').html(
        '<figure>'+
          '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" width="100%" height="100%">'+
              '<linearGradient id="lg" x1="0.5" y1="1" x2="0.5" y2="0">'+
                  '<stop offset="0%" stop-opacity="1" stop-color="crimson"/>'+
                  '<stop offset="'+self.first.percent+'" stop-opacity="1" stop-color="crimson">'+
                    '<animate attributeName="offset" values="0;'+self.first.decimal+';0" repeatCount="0.5" dur="5s" begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="'+self.first.percent+'" stop-opacity="0" stop-color="crimson">'+
                    '<animate attributeName="offset" values="0;'+self.first.decimal+';0" repeatCount="0.5" dur="5s"  begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="100%" stop-opacity="0" stop-color="crimson"/>'+
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
                  '<stop offset="'+self.second.percent+'" stop-opacity="1" stop-color="#006A00">'+
                    '<animate attributeName="offset" values="0;'+self.second.decimal+';0" repeatCount="0.5" dur="5s" begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="'+self.second.percent+'" stop-opacity="0" stop-color="#006A00">'+
                    '<animate attributeName="offset" values="0;'+self.second.decimal+';0" repeatCount="0.5" dur="5s"  begin="0s"/>'+
                  '</stop>'+
                  '<stop offset="100%" stop-opacity="0" stop-color="#006A00"/>'+
              '</linearGradient>'+
              '<circle cx="50" cy="50" r="30" fill="url(#lg)" stroke="black" stroke-width="4"/>'+
          '</svg>'+
        '</figure>'
        );
    });
  };

  self.getTeams();

  self.donate = function(id) {
    // console.log('[+] ID is: ' + id);
    $state.go('donate', {'id': id});
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
