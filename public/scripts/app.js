angular
  .module('FoodTruckApp', [
    'ngRoute',
    'LoginController',
    'rewards'
  ])
  .config([
    '$routeProvider',
    function ($routeProvider) {
      $routeProvider
        .when('/', {
          templateUrl: '/partials/users',
          controller: 'LoginController',
          controllerAs: 'login'
        })
        .otherwise('/');
    }
  ]);
