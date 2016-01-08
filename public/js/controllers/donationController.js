angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

DonationController.$inject = ['$state', '$stateParams', 'API'];

function DonationController($state, $stateParams, API) {
  var self = this;

  self.getTotal = function() {
    $.ajax({
      url: API+'/teams/'+ $stateParams.id,
      type: 'GET'
    }).done(function(data) {
      self.total = data.amount;
      // console.log(self.total);
    });
  };
  self.getTotal();

  self.donate = function(amount) {
    self.fullAmount = self.total + amount;
    $.ajax({
      url: API+'/teams/'+ $stateParams.id,
      type: 'PUT',
      data: { amount: self.fullAmount},
    }).done(function() {
      // console.log('Updated team with £' + amount);
      // console.log('Team total now £' + self.fullAmount);
      $state.go("vote");
    });
  };
};
