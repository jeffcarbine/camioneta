angular
  .module('RewardsController', [
    //'rewards.checkIn',
    //'rewards.redeem',
    'login.auth',
  ])
  .controller('RewardsController', [
    //'checkIn',
    //'redeem',
    'auth',
    '$location',
    function(auth, $location) {
      var rewards = this;

      auth.isLoggedIn().then(function(isLoggedIn) {
        console.log('Hitting!');
        if (!isLoggedIn) {
          $location.url('/login');
        }
      });

    }
  ]);
