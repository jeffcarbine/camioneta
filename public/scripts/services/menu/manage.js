angular
  .module('menu.manage', [
    'menu',
  ])
  .factory('manage', [
    '$http',
    'host',
    function($http, host) {
      var update = {
        create: function() {

        },
        update: function() {

        },
        remove: function() {

        },
      };
      return update;
    }
  ]);
