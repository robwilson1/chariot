angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

DonationController.$inject = ["$state"];

function DonationController($state) {
  var self = this;

  self.getTotal = function() {
    $.ajax({
      url: 'http://localhost:3000/api/teams/5665e92b699ea7ac664d58c7',
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
      url: 'http://localhost:3000/api/teams/5665e92b699ea7ac664d58c7',
      type: 'PUT',
      data: { amount: self.fullAmount},
    }).done(function() {
      console.log('Updated team with £' + amount);
      console.log('Team total now £' + self.fullAmount);
      $state.go("vote");
    });
  };
};
