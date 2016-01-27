var definitionDir = function() {
  return {

    restrict: 'E',

    scope: {
      wholeDefinition: '@definition',
      seperator: '=',
      isNonTerminal: '='
    },

    templateUrl: 'partials/definition_template.html',

    link: function(scope) {
      scope.seperator = scope.seperator || ' ';  // default to one space
      scope.definitionParts = scope.wholeDefinition.split(scope.seperator);

      // watch wholeDefinition for changes and re-seperate when changed
      scope.$watch(function (scope) {
        return scope.wholeDefinition;
      }, function (newDef) {
        scope.definitionParts = newDef.split(scope.seperator);
      });
    }
  };
};

module.exports = definitionDir;
