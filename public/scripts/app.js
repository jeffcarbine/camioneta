angular
  .module('FoodTruckApp', [
    'ngRoute',
    'LoginController',
  ])
  .config([
    '$routeProvider',
    function ($routeProvider) { 'use strict';
      $routeProvider
        .when('/', {
          templateUrl: '/partials/users',
          controller: 'LoginController',
          controllerAs: 'login'
        })
        .otherwise('/');
    },
  ]);
