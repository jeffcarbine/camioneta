angular
  .module('login', [
    'login.auth',
    'login.users',
  ])
  .value('rewardsHost', 'http://localhost:5000');
