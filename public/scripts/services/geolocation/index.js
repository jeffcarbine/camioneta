angular
  .module('location', [
    'location.set',
    'location.get',
  ])
  .value('geoHost', 'http://localhost:3000');
