angular
.module('FoodTruckApp', [
  'ngRoute',
  'LoginController',
  'DashboardController',
])
.config([
  '$routeProvider',
  function ($routeProvider) { 'use strict';
    $routeProvider
      .when('/', {
        templateUrl: '/partials/rewards',
        controller: 'LoginController',
        controllerAs: 'login',
      })
      .when('/dashboard', {
        templateUrl: './partials/dashboard',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
      })
      .otherwise('/');
  },
]);
