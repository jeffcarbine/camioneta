angular
  .module('UserModule', [
    'rewards'
  ])
  .factory('users', [
    '$http',
    'rewardsHost',
    function($http, host) {
      var users = {
        create: function(user) {
          return $http.post(host + '/users', {
            email: email,
            password: password
          });
        }
      };
      return users;
    }
  ]);
