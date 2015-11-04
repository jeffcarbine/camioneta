angular
  .module('LoginController', [
    'rewards.auth'
  ])
  .controller('LoginController', [
    'rewards.auth',
    'UserModule',
    function (auth, users) {

      this.signin = function(email, password) {
        auth.login(email, password)
          .then(function(res) {
            console.log(res.data);
          })
          .catch(function(res) {
            console.log('error: ', res.data);
          });
      };

      this.signup = function(email, password) {
        users
          .create({
            email: email,
            password: password
          })
          .then(function(res) {
            console.log(res.data);
          })
          .catch(function(res) {
            console.log(res.data);
          })
      }

    },
  ]);
