angular
  .module('DashboardController', [
    'ngMap'
  ])
  .controller('DashboardController', [
    'get',
    function(get) {
      var status;
      var dashboard = this;
      get.location()
        .then(function(res) {
          dashboard.coord = [
            res.data.latitude,
            res.data.longitude
          ];
          status = res.data.status;
          console.log(status);
        });
    },
  ]);
