angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

function DonationController() {
  var self = this;

  self.donate = function(amount) {
    $.ajax({
      url: 'http://localhost:3000/api/teams/:id',
      type: 'PUT',
      data: { amount: amount},
    }).done(function() {
      console.log('Updated team with £' + amount);
    });
  };
};
