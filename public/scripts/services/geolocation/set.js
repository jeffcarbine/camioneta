angular
  .module('location.set', [
    'location',
  ])
  .factory('set', [
    'host',
    '$http',
    function(host, $http) {
      var set = {
        open: function() {
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
              var date = new Date();
              setGeo(latitude, longitude, date);
            }
            function setGeo(latitude, longitude, date) {
              return $http
                .post(host + '/setLocation', {
                  latitude: latitude,
                  longitude: longitude,
                  date: date,
                  status: 0, // 0 = open
                });
            }
        },
        close: function() {
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
                  status: 2, // 2 = closed
                });
            }
        },
        move: function() {
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
                  status: 1, // 1 = moving
                });
            }
        },
      };
      return set;
    },
  ]);
