angular
  .module('RewardsController', [
    'login.auth',
    'location.get',
    'rewards.checkIn',
  ])
  .controller('RewardsController', [
    'auth',
    '$location',
    'get',
    'checkIn',
    function(auth, $location, get, checkIn) {
      var rewards = this;

      var user; // setting up blank user variable for check in later

      var userLongitude;
      var userLatitude;
      var truckLongitude;
      var truckLatitude;

      rewards.verify = function() {
        getUserLocation();

        function getUserLocation() {
          get.location()
          .then(function(res) {
            truckLatitude = res.data.latitude;
            truckLongitude = res.data.longitude;
            console.log('Truck is at ' + truckLatitude + ', ' + truckLongitude);
          });
          getTruckLocation();
        }

        function getTruckLocation() {
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Getting GPS coordinates...');
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            console.log('User is at ' + userLatitude + ', ' + userLongitude);
            checkUserLocation();
          });
        }

        function checkUserLocation() {
          if ((userLatitude > (truckLatitude - 0.0005) && userLatitude < (truckLatitude + 0.0005)) && (userLongitude > (truckLongitude - 0.0005) && userLongitude < (truckLongitude + 0.0005))) {
            checkLastCheckIn();
          } else {
            checkInFailed('location');
          }
        }

        function checkLastCheckIn() {
          var lastCheckIn;
          checkIn.verify()
          .then(function(res) {
            lastCheckIn = res.data.lastCheckIn;
          });
          var today = new Date();
          console.log(today + ' vs ' + lastCheckIn);
          if(lastCheckIn === undefined) {
            checkInSuccessful();
          } else {
            checkInFailed('time');
          }
        }

        function checkInSuccessful() {
          rewards.message = 'Check in successful';

        }

        function checkInFailed(message) {
          rewards.message = 'Check in failed';
          console.log(message);
          // return failed response & option for vendor override
        }

      };

      auth.isLoggedIn().then(function(isLoggedIn) {
        if (!isLoggedIn) {
          $location.url('/login');
        }
      });

      auth.getUserName().then(function(username) {
        if (username) {
          user = username.email;
          console.log(username.lastCheckIn);
          console.log(user);
        }
      });

    }
  ]);
