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
    '$q',
    function(auth, $location, get, checkIn, $q) {
      var rewards = this;
      rewards.override = false; // hides the vendor override option until the user fails check in

      jQuery('.navItem').not('.rewards').removeClass('active');
      jQuery('.rewards').addClass('active');

      var userLongitude;
      var userLatitude;
      var truckLongitude;
      var truckLatitude;
      var truckStatus;

      rewards.verify = function() {
        rewards.message = 'Checking in...';
        getTruckStatus();

        function getTruckStatus() {
          console.log('Getting truck location...');
          get.location()
          .then(function(res) {
            truckLatitude = res.data.latitude;
            truckLongitude = res.data.longitude;
            truckStatus = res.data.status;
            console.log('Truck is at ' + truckLatitude + ', ' + truckLongitude + ' with a status of ' + truckStatus);
            if(truckStatus === 0) {
              getUserLocation();
            } else {
              checkInFailed(1);
            }
          });
        }

        function getUserLocation() {
          console.log('Getting your location...');
          navigator.geolocation.getCurrentPosition(function(position) {
            console.log('Getting GPS coordinates...');
            userLatitude = position.coords.latitude;
            userLongitude = position.coords.longitude;
            console.log('User is at ' + userLatitude + ', ' + userLongitude);
            $q.resolve().then(checkUserLocation);
          });
        }

        function checkUserLocation() {
          console.log('Verifying your location...');
          if ((userLatitude > (truckLatitude - 0.0005) && userLatitude < (truckLatitude + 0.0005)) && (userLongitude > (truckLongitude - 0.0005) && userLongitude < (truckLongitude + 0.0005))) {
            checkLastCheckIn();
          } else {
            checkInFailed(2);
            console.log('Fails here!');
          }
        }

        function checkLastCheckIn() {
          console.log('Verifying last check in...');
          var lastCheckIn;
          checkIn.verify()
          .then(function(res) {
            lastCheckIn = res.data.lastCheckIn;
            if(lastCheckIn === undefined) {
              checkInSuccessful();
            } else {
              var lastCheckInDate = (new Date(lastCheckIn).getYear() + new Date(lastCheckIn).getMonth() + new Date(lastCheckIn).getDay());
              var today = (new Date().getYear() + new Date().getMonth() + new Date().getDay());
              if (today > lastCheckInDate) {
                checkInSuccessful();
              } else {
                checkInFailed(3);
              }
            }
          });
        }

        function checkInSuccessful() {
          console.log('Check in successful.');
          rewards.message = 'Cha-ching! You scored a rewards point!';
          checkIn.update()
          .then(function(res) {
            rewards.total = res.data.rewards;
          });
        }

        function checkInFailed(m) {
          var theMessage;
          var override = false;

          switch(m) {
            case 1:
              theMessage = 'Sorry, you can only check in when the truck is open!';
              break;
            case 2:
              theMessage = 'Sorry, you can only check in when you are at the truck.';
              //override = true;
              break;
            case 3:
              theMessage = 'Sorry, you can only check in one time per day!';
              break;
            default:
              theMessage = 'The check in process failed. Please try again.';
              //override = true;
              break;
          }

          rewards.message = theMessage;
          rewards.override = override;
          console.log(theMessage);
          console.log(override);
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
            rewards.wording = 'reward';
          } else {
            rewards.wording = 'rewards';
          }
        }
      });

    }
  ]);
