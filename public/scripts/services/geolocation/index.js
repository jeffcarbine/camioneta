angular
  .module('location', [
    'location.set',
    'location.get',
  ])
  .value('host', 'http://localhost:3000');
