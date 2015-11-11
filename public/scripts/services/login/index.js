angular
  .module('login', [
    'login.auth',
    'login.users',
  ])
  .value('loginHost', 'http://localhost:3000');
