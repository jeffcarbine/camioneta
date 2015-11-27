angular
  .module('rewards.checkIn', [
    'rewards',
  ])
  .factory('checkIn',[
    '$http',
    'host',
    function($http, host) {
      var checkIn = {
        verify: function() {
          return $http
            .get(host + '/checkIn');
        },
        update: function() {
          return $http
            .post(host + '/checkIn');
        }
      };
      return checkIn;
    },
  ]);
