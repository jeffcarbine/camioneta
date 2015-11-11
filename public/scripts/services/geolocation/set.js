angular
  .module('geo.set', [
    'geo',
  ])
  .factory('set', [
    '$http',
    'geoHost',
    function($http, host) {
      var set = {
        set: function() {
          if (navigator.geoLocation) {
              return $http
              .post(host + '/geo', {
                latitude: position.coords.latitude,
                longitude: position.coords.longitude
              });
          } else {
            console.log('Unsupported');
          }
        },
      };
    },
  ]);
