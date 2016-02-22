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
        vm.allStates = ["me", "ma", "mi", "mt", "nv", "nj", "ny", "nc", "oh", "pa", "ri", "tn", "tx", "ut", "wa", "wi", "pr", "md", "al", "ak", "az", "ar", "ca", "co", "ct", "de", "dc", "fl", "ga", "hi", "id", "il", "in", "ia", "ks", "ky", "la", "mn", "ms", "mo", "ne", "nh", "nm", "nd", "ok", "or", "sc", "sd", "vt", "va", "wv", "wy"];

        vm.huffApi = function() {
            console.log('huffAPI');

            getState();
            //updates call based on user selection of Dem or GOP
                vm.allStates.forEach(function(x) {
        $('#' + x).css('fill', 'darkslategrey');
          $.ajax({
              url: "https://elections.huffingtonpost.com/pollster/api/charts.json?callback=pollsterChart&state=" + x + "&topic=2016-president-" + vm.party + "-primary",
              type: "GET",
              dataType: 'script',
              cache: true,
          });
      });
        };
        activate();

        setTimeout(function() {
            vm.allStates.forEach(function(x) {
                $('#' + x).css('fill', '#222222');
                console.log('coloring ' + x);
                vm.huffApi(x);
            });
        }, 100);

        function activate() {
            getWebDevTec();
            $timeout(function() {
                vm.classAnimation = 'rubberBand';
            }, 4000);
        }

        function getState() {
            if ($('.active')[0]) {
                var state = $('.active')[0].id;
                vm.state = state;
            }
        }


        function getWebDevTec() {
            vm.awesomeThings = webDevTec.getTec();

            angular.forEach(vm.awesomeThings, function(awesomeThing) {
                awesomeThing.rank = Math.random();
            });
        }
    }


})();
