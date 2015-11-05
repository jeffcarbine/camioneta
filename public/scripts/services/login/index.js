angular
  .module('login', [
    'login.auth',
    'login.users',
  ])
  .value('rewardsHost', 'http://localhost:3000');
