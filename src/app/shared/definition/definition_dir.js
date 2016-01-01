
var definitionDir = function() {
  return {

    restrict: 'E',

    scope: {
      wholeDefinition: '=definition',
      seperator: '='
    },

    templateUrl: 'partials/definition_template.html',

    link: function(scope) {
      scope.seperator = scope.seperator || ' ';  // default to one space
      scope.definitionParts = scope.wholeDefinition.split(scope.seperator);

      scope.changeDefinition = function (index, newDefinitionPart) {
        console.log('changed:', index, newDefinitionPart);
      };
    }
  };
};

module.exports = definitionDir;
