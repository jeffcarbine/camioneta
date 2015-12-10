angular
  .module('MenuController', [

  ])
  .controller('MenuController', [
    function() {
      jQuery('.navItem').not('.menu').removeClass('active');
      jQuery('.navItem.menu').addClass('active');
    },
  ]);
