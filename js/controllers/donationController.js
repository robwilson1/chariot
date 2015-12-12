angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

DonationController.$inject = ['$state', '$routeParams'];

function DonationController($state, $routeParams) {
  var self = this;
  console.log($routeParams)

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
