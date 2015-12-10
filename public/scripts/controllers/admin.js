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
          admin.message = 'open.';
          admin.isOpen = true;
          admin.isMoving = false;
          admin.isClosed = false;
        } else  if (res.data.status === 2){
          admin.message = 'closed.';
          admin.isOpen = false;
          admin.isMoving = false;
          admin.isClosed = true;
        } else if (res.data.status === 1) {
          admin.message = 'moving.';
          admin.isOpen = false;
          admin.isMoving = true;
          admin.isClosed = false;
        } else {
          admin.message = 'Oops. Something went wrong.';
        }
      });
      admin.open = function() {
        admin.message = 'opening...';
        set.open(function(err, res) {
          admin.message = 'open.';
          admin.isOpen = true;
          admin.isMoving = false;
          admin.isClosed = false;
        });
      };
      admin.move = function() {
        admin.message = 'packing up...';
        set.move(function(err, res) {
          admin.message = 'moving.';
          admin.isOpen = false;
          admin.isMoving = true;
          admin.isClosed = false;
        });
      };
      admin.close = function() {
        admin.message = 'closing...';
        set.close(function(err, res) {
          admin.message = 'closed.';
          admin.isOpen = false;
          admin.isClosed = true;
          admin.isMoving = false;
        });
      };
    },
  ]);
