angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

function DonationController() {
  var self = this;

  self.donate = function(amount) {
    $.ajax({
      url: 'http://localhost:3000/api/teams/5665e92b699ea7ac664d58c7',
      type: 'PUT',
      data: { amount: amount},
    }).done(function() {
      console.log('Updated team with £' + amount);
    });
  };
};
