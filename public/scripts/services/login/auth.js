angular
  .module('login.auth', [
    'login'
  ])
  .factory('auth', [
    '$http',
    'rewardsHost',
    function($http, host) {
      var auth = {
        login: function(email, password) {
          return $http
            .post(host + '/session', {
              email: email,
              password: password,
            });
        }
      };

      return auth;
    },
  ]);
