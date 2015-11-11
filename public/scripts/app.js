angular
.module('FoodTruckApp', [
  'ngRoute',
  'LoginController',
  'DashboardController',
  'AdminController',
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
      .when('/admin', {
        templateUrl: './partials/admin',
        controller: 'AdminController',
        controllerAs: 'admin',
      })
      .otherwise('/');
  },
]);
