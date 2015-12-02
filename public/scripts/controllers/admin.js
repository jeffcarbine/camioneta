angular
  .module('AdminController', [
    'location',
  ])
  .controller('AdminController', [
    'set',
    'get',
    function(set, get) {
      var admin = this;
      get.location()
      .then(function(res) {
        if(res.data.status === 0) {
          admin.message = 'Truck is open.';
        } else  if (res.data.status === 1){
          admin.message = 'Truck is closed.';
        } else if (res.data.status === 2) {
          admin.message = 'Truck is moving.';
        } else {
          admin.message = 'Oops. Something went wrong.';
        }
      });
      admin.set = function() {
        get.location()
        .then(function(res) {
          if(res.data.status === 2 || res.data.status === 1) {
            admin.message = 'Truck is opening...';
            set.open();
          } else  if (res.data.status === 0){
            admin.message = 'Truck is closing...';
            set.close();
          } else {
            admin.message = 'Something went wrong. Tuck is opening...';
            set.open();
          }
        });
      };
      admin.move = function() {
        admin.message = 'Getting ready to move...';
        set.move();
      };
    },
  ]);
