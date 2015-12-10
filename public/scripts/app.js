angular
.module('FoodTruckApp', [
  'ngRoute',
  'LoginController',
  'DashboardController',
  'AdminController',
  'RewardsController',
])
.config([
  '$routeProvider',
  function ($routeProvider) { 'use strict';
    $routeProvider
      .when('/', {
        templateUrl: './partials/dashboard',
        controller: 'DashboardController',
        controllerAs: 'dashboard',
      })
      .when('/login', {
        templateUrl: '/partials/login',
        controller: 'LoginController',
        controllerAs: 'login',
      })
      .when('/rewards', {
        templateUrl: '/partials/rewards',
        controller: 'RewardsController',
        controllerAs: 'rewards',
      })
      .when('/menu', {
        teamplateUrl: '/partials/menu',
        controller: 'MenuController',
        controllerAs: 'menu',
      })
      .when('/admin', {
        templateUrl: './partials/admin',
        controller: 'AdminController',
        controllerAs: 'admin',
      })
      .otherwise('/');
  },
]);
