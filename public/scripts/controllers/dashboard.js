angular
  .module('DashboardController', [
    'ngMap'
  ])
  .controller('DashboardController', [
    'get',
    function(get) {
      var dashboard = this;
      dashboard.isAdmin = false; // turn to false for user app
      dashboard.truckName = 'Snowy Awesome';
      var status;
      get.location()
        .then(function(res) {
          dashboard.coord = [
            res.data.latitude,
            res.data.longitude
          ];
          status = res.data.status;
          var open;
          var closed;
          var moving;
          if(status === 0) {
            open = true;
            closed = false;
            moving = false;
          } else if (status === 1) {
            open = false;
            closed = false;
            moving = true;
          } else if (status === 2) {
            open = false;
            closed = true;
            moving = false;
          }
          dashboard.open = open;
          dashboard.closed = closed;
          dashboard.moving = moving;
        });
      setTimeout(function(){
       window.location.reload(1);
      }, 60000);
    },
  ]);
