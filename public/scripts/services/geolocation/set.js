angular
  .module('location.set', [
    'location',
  ])
  .factory('set', [
    '$http',
    'geoHost',
    function($http, host) {
      var set = {
        location: function() {
          var latitude;
          var longitude;
            navigator.geolocation.getCurrentPosition(function(position) {
              console.log('Getting GPS coordinates...');
              latitude = position.coords.latitude;
              longitude = position.coords.longitude;
              console.log('Coordinates are ' + latitude + ', ' + longitude);
              createDate(latitude, longitude);
            });
            function createDate(latitude, longitude) {
              var date = Date.now();
              setGeo(latitude, longitude, date);
            }
            function setGeo(latitude, longitude, date) {
              return $http
                .post(host + '/setLocation', {
                  latitude: latitude,
                  longitude: longitude,
                  date: date,
                });
            }
        },
      };
      return set;
    },
  ]);
