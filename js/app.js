angular
  .module('chariotApp', ['ui.router', 'ngResource'])
  .config(MainConfig);

function MainConfig($stateProvider, $urlRouterProvider) {
  $stateProvider
  .state('landing', {
    url: '/',
    templateUrl: '_landing2.html',
  })
  .state('vote', {
    url: '/vote',
    templateUrl: '_votepage.html',
  })
  .state('donate', {
    url: '/donate/{id}',
    templateUrl: '_donation.html',
  })
  .state('graphic', {
    url: '/graphic',
    templateUrl: '_graphic.html',
  })
  .state('new', {
    url: '/new',
    templateUrl: '_new2.html',
  });

  $urlRouterProvider.otherwise('/');
};
