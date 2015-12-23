// routing information for the app
var routeConfig = ['$stateProvider', '$urlRouterProvider',
  function($stateProvider, $urlRouterProvider) {
    // for any unmatched url, redirect to /grammarBuilder
    $urlRouterProvider.otherwise('builder');

    $stateProvider
      .state('builder', {
        url: '/builder',
        templateUrl: 'partials/builder.html',
        controller: 'BuilderCtrl'
      });
  }];

module.exports = routeConfig;
