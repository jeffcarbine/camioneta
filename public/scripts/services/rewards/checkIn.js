angular
  .module('rewards.checkIn', [
    'rewards',
  ])
  .factory('checkIn',[
    '$http',
    'geoHost',
    function($http, geoHost) {
      var checkIn = function() {
        var userLatitude;
        var userLongitude;
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Getting GPS coordinates...');
            latitude = position.coords.latitude;
            longitude = position.coords.longitude;
            console.log('Coordinates are ' + latitude + ', ' + longitude);
            verifyCheckIn(latitude, longitude);
          });

          // get most recent location from database

          function verifyCheckIn(userLatitude, userLongitude) {
            if ((userLatitude > (latitude - 0.0005) && userLatitude < (latitude + 0.0005)) && (userLongitude > (longitude - 0.0005) && userLongitude < (longitude + 0.0005))) {
              checkInSuccessful();
            } else {
              checkInFailed();
            }
          }

          function checkInSuccessful() {
            // check that user's last checkIn was more that 24hrs ago
            // add a point to user's account
            // log checkIn to user's account
            // return confirmed response
          }

          function checkInFailed() {
            // return failed response & option for vendor override
          }
      };
      return checkIn;
    },
  ]);
