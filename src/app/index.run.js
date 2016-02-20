(function() {
  'use strict';

  angular
    .module('hackathon')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
