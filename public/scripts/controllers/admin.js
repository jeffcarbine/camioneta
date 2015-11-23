angular
  .module('AdminController', [
    'location',
  ])
  .controller('AdminController', [
    'set',
    'get',
    function(set, get) {
      var admin = this;
      admin.set = function() {
        get.location()
        .then(function(res) {
          if(res.data.status === 2 || res.data.status === 1) {
            console.log('Truck was closed. Opening!');
            set.open();
          } else  if (res.data.status === 0){
            console.log('Truck was open. Closing!');
            set.close();
          } else {
            console.log('I am erorr! Opening!');
            set.open();
          }
        });
      };
      admin.move = function() {
        console.log('Moving to a new location');
        set.move();
      };
    },
  ]);
