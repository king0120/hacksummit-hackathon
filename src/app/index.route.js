(function() {
  'use strict';

  angular
    .module('hackathon')
    .config(routerConfig);

  /** @ngInject */
  function routerConfig($stateProvider, $urlRouterProvider, $locationProvider) {
    $stateProvider
      .state('home', {
        url: '/',
        templateUrl: 'app/main/main.html',
        controller: 'MainController',
        controllerAs: 'main'
      })
      .state('d3', {
        url: '/d3',
        templateUrl: 'app/d3/d3.html',
        controller: 'd3Controller',
        controllerAs: 'd3'
      });

    $locationProvider.html5Mode(true);
    $urlRouterProvider.otherwise('/');
  }

})();
