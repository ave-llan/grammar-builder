(function() {
  'use strict';

  angular
    .module('grammarBuilder')
    .run(runBlock);

  /** @ngInject */
  function runBlock($log) {

    $log.debug('runBlock end');
  }

})();
