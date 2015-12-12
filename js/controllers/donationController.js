angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

DonationController.$inject = ['$state', '$stateParams'];

function DonationController($state, $stateParams) {
  var self = this;
  console.log($stateParams.id)

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

  };
};
