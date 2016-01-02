var keycode = require('keycode');

var definitionDir = function() {
  return {

    restrict: 'E',

    scope: {
      wholeDefinition: '=definition',
      seperator: '=',
      isNonTerminal: '='
    },

    templateUrl: 'partials/definition_template.html',

    link: function(scope) {
      scope.seperator = scope.seperator || ' ';  // default to one space
      scope.definitionParts = scope.wholeDefinition.split(scope.seperator);

      scope.changeDefinition = function (index, newDefinitionPart) {
        return newDefinitionPart;
      };

      scope.handleKeydown = function (keyCode, partIndex) {
        console.log('handleKeydown:', keyCode, partIndex);
        console.log('seperator:', keycode(scope.seperator));
      };
    }
  };
};

module.exports = definitionDir;
