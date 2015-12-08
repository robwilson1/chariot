angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

DonationController.$inject = ["$state"];

function DonationController($state) {
  var self = this;

  self.donate = function(amount) {
    $.ajax({
      url: 'http://localhost:3000/api/teams/5665d58ac1662abf4830c703',
      type: 'PUT',
      data: { amount: amount},
    }).done(function() {
      console.log('Updated team with £' + amount);
      $state.go("vote");
    });
  };
};
