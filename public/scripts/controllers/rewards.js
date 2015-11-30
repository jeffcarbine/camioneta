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
      rewards.overrise = false; // hides the vendor override option until the user fails check in

      jQuery('.navItem').not('.rewards').removeClass('active');
      jQuery('.rewards').addClass('active');

      var userLongitude;
      var userLatitude;
      var truckLongitude;
      var truckLatitude;
      var truckStatus;

      rewards.verify = function() {
        getTruckStatus();

        function getTruckStatus() {
          get.location()
          .then(function(res) {
            truckLatitude = res.data.latitude;
            truckLongitude = res.data.longitude;
            truckStatus = res.data.status;
            console.log('Truck is at ' + truckLatitude + ', ' + truckLongitude + ' with a status of ' + truckStatus);
            if(truckStatus === 0) {
              getUserLocation();
            } else {
              checkInFailed('closed');
            }
          });
        }

        function getUserLocation() {
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
            lastCheckIn = new Date(res.data.lastCheckIn);
            console.log(new Date() + ' vs ' + lastCheckIn);
            if(lastCheckIn === undefined || lastCheckIn > new Date()) {
              checkInSuccessful();
            } else {
              checkInFailed('time');
            }
          });
        }

        function checkInSuccessful() {
          rewards.message = 'Check in successful';
          checkIn.update();
        }

        function checkInFailed(message) {
          if(message == 'closed') {
            rewards.message = "You can't check in if the truck is closed.";
          } else if (message == 'location') {
            rewards.message = "You can only check in when you're at the truck.";
            rewards.override = true;
          } else if (message == 'time') {
            rewards.message = "You can only check in one time per day.";
          } else {
            rewards.message = 'The check in process failed. Please try again.';
            rewards.override = true;
          }
        }

      };

      auth.isLoggedIn().then(function(isLoggedIn) {
        if (!isLoggedIn) {
          $location.url('/login');
        }
      });

      auth.getUserName().then(function(user) {
        if (user) {
          rewards.user = user.email;
          rewards.total = user.rewards;
          if(user.rewards === 1) {
            rewards.wording = 'reward!';
          } else {
            rewards.wording = 'rewards!';
          }
        }
      });

    }
  ]);
