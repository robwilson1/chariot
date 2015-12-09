angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

DonationController.$inject = ["$state"];

function DonationController($state) {
  var self = this;

  self.arrayteamid   = '5666b53b90c3e7d93bf0c719';
  self.booleanteamid = '5666b53b90c3e7d93bf0c71a';
  self.getTotal = function() {
    $.ajax({
      url: 'http://localhost:3000/api/teams/'+ self.booleanteamid,
      type: 'GET'
    }).done(function(data) {
      self.total = data.amount;
      console.log(self.total);
    });
  };
  self.getTotal();

  self.donate = function(amount) {
    self.fullAmount = self.total + amount;
    $.ajax({
      url: 'http://localhost:3000/api/teams/'+ self.booleanteamid,
      type: 'PUT',
      data: { amount: self.fullAmount},
    }).done(function() {
      console.log('Updated team with £' + amount);
      console.log('Team total now £' + self.fullAmount);
      $state.go("vote");
    });
  };
};
