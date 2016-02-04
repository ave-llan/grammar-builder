var topNavDir = ['grammarService', function(grammarService) {
  return {

    restrict: 'E',

    scope: {},

    templateUrl: 'partials/top_nav_template.html',

    link: function(scope) {
      scope.grammars = [];

      function onGrammarsSet (error, grammars) {
        console.log('onGrammarsSet:', error, grammars);
        scope.grammars = grammars;
      }

      function init () {
        grammarService.getGrammars(onGrammarsSet);
      }

      init();

    }
  };
}];

module.exports = topNavDir;
