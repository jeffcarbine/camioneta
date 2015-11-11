angular
  .module('AdminController', [
    'geo',
  ])
  .controller('AdminController', [
    'set',
    function(set) {
      var admin = this;
      admin.submit = set.getLocation();
    }
  ]);
