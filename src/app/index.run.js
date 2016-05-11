(function() {
  'use strict';

  angular
    .module('angularTesting')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
