angular
  .module('LoginController', [
    'login.auth',
    'login.users',
    'toggleDirective',
  ])
  .controller('LoginController', [
    'auth',
    'users',
    '$location',
    function (auth, users, $location) {
      var login = this;

      jQuery('.navItem').not('.rewards').removeClass('active');
      jQuery('.rewards').addClass('active');

      auth.isLoggedIn().then(function(isLoggedIn) {
        if (isLoggedIn) {
          $location.url('/dashboard');
        }
      });

      login.inputType = 'signin';

      login.submit = function(email, password) {

        login[login.inputType](email, password)
          .then(function(res) {
            $location.url('/rewards');
          })
          .catch(function(res) {
            console.log(res.status, res.data);
            login.errorMessage = res.data.message;
          });
      };

      login.signin = function(email, password) {
        return auth.login(email, password);
      };

      login.signup = function(email, password) {
        return users
          .create({
            email: email,
            password: password
          })
          .then(function(res) {
            return auth.login(email, password);
          });
      };

    },
  ]);
