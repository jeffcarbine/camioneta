angular
  .module('geo', [
    'geo.set',
    'geo.retrieve',
  ])
  .value('geoHost', 'http://localhost:3000');
