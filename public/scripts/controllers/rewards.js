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
              checkInFailed('closed');
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
            checkUserLocation();
          });
        }

        function checkUserLocation() {
          console.log('Verifying your location...');
          if ((userLatitude > (truckLatitude - 0.0005) && userLatitude < (truckLatitude + 0.0005)) && (userLongitude > (truckLongitude - 0.0005) && userLongitude < (truckLongitude + 0.0005))) {
            checkLastCheckIn();
          } else {
            checkInFailed('location');
          }
        }

        function checkLastCheckIn() {
          console.log('Verifying last check in...');
          var lastCheckIn;
          checkIn.verify()
          .then(function(res) {
            lastCheckIn = res.data.lastCheckIn;
            if(lastCheckIn === undefined) {
              console.log('This is first check in for user.');
              checkInSuccessful();
            } else {
              var lastCheckInYear = new Date(lastCheckIn).getYear();
              var year = new Date().getYear();
              if (year === lastCheckInYear) {
                console.log('Check in dates are in the same year');
                var lastCheckInMonth = new Date(lastCheckIn).getMonth();
                var month = new Date().getMonth();
                if(month === lastCheckInMonth) {
                  console.log('Check in dates are in the same month.');
                  var lastCheckInDay = new Date(lastCheckIn).getDate();
                  var today = new Date().getDate();
                  if(today > lastCheckIn) {
                    console.log('Last check in was more than a day ago.');
                    checkInSuccessful();
                  } else {
                    console.log('Last check in was less than a day ago.');
                    checkInFailed('time');
                  }
                } else if (month > lastCheckInMonth) {
                  console.log('Last check in was last month.');
                  checkInSuccessful();
                } else {
                  console.log('Last check in was next month. Are you a time traveller?');
                  checkInFailed('time');
                }
              } else if (year > lastCheckInYear) {
                console.log('Last check in was last year.');
                checkInSuccessful();
              } else {
                console.log('Last check in was next year. Where is your TARDIS?');
                checkInFailed('time');
              }
            }
          });
        }

        function checkInSuccessful() {
          console.log('Check in successful.');
          rewards.message = 'Cha-ching! You scored a rewards point!';
          checkIn.update();
        }

        function checkInFailed(message) {
          console.log('Check in failed because of error ' + message);
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
