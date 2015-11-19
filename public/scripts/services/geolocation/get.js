angular
  .module('location.get', [
    'location',
  ])
  .factory('get', [
    'geoHost',
    '$http',
    function(host, $http) {
      var get = {
        location: function() {
          return $http
            .get(host + '/getLocation');
        }
      };
      return get;
    },
  ]);
