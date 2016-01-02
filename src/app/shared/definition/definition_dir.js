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

      scope.getCaretCharacterOffsetWithin = function (element) {
        var caretOffset = 0;
        var doc = element.ownerDocument || element.document;
        var win = doc.defaultView || doc.parentWindow;
        var sel;
        if (typeof win.getSelection != 'undefined') {
          sel = win.getSelection();
          if (sel.rangeCount > 0) {
            var range = win.getSelection().getRangeAt(0);
            var preCaretRange = range.cloneRange();
            preCaretRange.selectNodeContents(element);
            preCaretRange.setEnd(range.endContainer, range.endOffset);
            caretOffset = preCaretRange.toString().length;
          }
        } else if ( (sel = doc.selection) && sel.type != 'Control') {
          var textRange = sel.createRange();
          var preCaretTextRange = doc.body.createTextRange();
          preCaretTextRange.moveToElementText(element);
          preCaretTextRange.setEndPoint('EndToEnd', textRange);
          caretOffset = preCaretTextRange.text.length;
        }
        return caretOffset;
      };

    }
  };
};

module.exports = definitionDir;
