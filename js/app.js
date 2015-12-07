angular
  .module('chariotApp', ['ui.router', 'ngResource'])
  .config(MainConfig);

function MainConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: '_landing.html',
  })
  .state('vote', {
    url: '/vote',
    templateUrl: '_votepage.html',
  })
  .state('donate', {
    url: '/donate',
    templateUrl: '_donation.html',
  })
  .state('new', {
    url: '/new',
    templateUrl: '_new.html',
  });

  $urlRouterProvider.otherwise('/');
};
