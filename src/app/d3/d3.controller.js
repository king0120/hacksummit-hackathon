(function() {
  'use strict';

  angular
    .module('hackathon')
    .controller('d3Controller', d3Controller);

  /** @ngInject */
  function d3Controller($timeout, webDevTec, toastr) {
    var vm = this;

    vm.party = 'dem';
    vm.state = '';
    vm.classAnimation = '';
    vm.creationDate = 1455958764146;
    vm.showToastr = showToastr;
    vm.huffApi = function(){
      console.log('huffAPI');

      getState();
        //updates call based on user selection of Dem or GOP

        $.ajax({
            url: "https://elections.huffingtonpost.com/pollster/api/charts.json?callback=pollsterChart&state=" + vm.state + "&topic=2016-president-" + vm.party + "-primary",
            type: "GET",
            dataType: 'script',
            cache: true,
        });
    };
    activate();

    function activate() {
      getWebDevTec();
      $timeout(function() {
        vm.classAnimation = 'rubberBand';
      }, 4000);
    }

    function getState(){
      var state = $('.active')[1].id;
      vm.state = state;
    }


    function showToastr() {
      toastr.info('Fork <a href="https://github.com/Swiip/generator-gulp-angular" target="_blank"><b>generator-gulp-angular</b></a>');
      vm.classAnimation = '';
    }

    function getWebDevTec() {
      vm.awesomeThings = webDevTec.getTec();

      angular.forEach(vm.awesomeThings, function(awesomeThing) {
        awesomeThing.rank = Math.random();
      });
    }
  }
})();
