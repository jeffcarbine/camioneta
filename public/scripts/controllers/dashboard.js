angular
  .module('DashboardController', [
    // something
  ])
  .controller('DashboardController', [
    'get',
    function(get) {
      var dashboard = this;
      get.location()
        .then(function(res) {
          dashboard.coord = res.data;
        });
    }
  ]);
