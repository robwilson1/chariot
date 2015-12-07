angular
  .module('chariotApp')
  .controller('DonationController', DonationController);

DonationController.$inject = ['$resource'];
function DonationController($resource) {
  var self = this;

  self.donate = function(amount) {
    console.log(amount);
    $resource(
      'http://www.justgiving.com/4w350m3/donate/direct/charity/:charityId',
      {charityId: '@id'},
      {donate: {
        method: 'POST',
        params: {},
      }, });
  };
};
