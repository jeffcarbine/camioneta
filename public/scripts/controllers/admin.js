angular
  .module('AdminController', [
    'location',
  ])
  .controller('AdminController', [
    'set',
    function(set) {
      var admin = this;
      admin.submit = set.location;
    }
  ]);
