angular
.module('login.users', [
  'login'
])
.factory('users', [
  '$http',
  'loginHost',
  function($http, host) {
    var users = {
      create: function(user) {
        return $http.post(host + '/users', user);
      }
    };

    return users;
  },
]);
