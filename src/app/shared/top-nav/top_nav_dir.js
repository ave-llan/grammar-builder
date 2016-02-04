var topNavDir = ['grammarService', function(grammarService) {
  return {

    restrict: 'E',

    scope: {},

    templateUrl: 'partials/top_nav_template.html',

    link: function(scope) {
      scope.grammars = [];

      function onGrammarNamesSet (error, grammars) {
        console.log('onGrammarsSet:', error, grammars);
        scope.grammars = grammars;
      }

      function init () {
        grammarService.getGrammars(onGrammarNamesSet);
      }

      init();

    }
  };
}];

module.exports = topNavDir;
