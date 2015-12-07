angular
  .module('chariotApp', ['ui-router', 'ngResource'])
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
  });

  $urlRouterProvider.otherwise('/');
};
