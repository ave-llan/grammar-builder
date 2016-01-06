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

      scope.$watch(function (scope) { return scope.wholeDefinition; },
                   function (newDef) {
                     scope.definitionParts = newDef.split(scope.seperator);
                   });

      scope.changeDefinition = function (index, newDefinitionPart) {
        return newDefinitionPart;
      };

      scope.handleKeydown = function ($event, partIndex) {
        console.log('handleKeydown:', $event.keyCode, partIndex);
        // console.log('seperator:', keycode(scope.seperator));
      };

      scope.handleKeyUp = function ($event) {
        if ($event.keyCode == keycode(scope.seperator)) {
          console.log('creating new def part');
        }
        if (scope.getCaretCharacterOffsetWithin($event.target) == '0') {
          console.log('moving to previous part');
        }
      };

      scope.changeDefinition = function ($event) {
        console.log('changed definition:', $event);
      };

      /**
       * given an elemenet, finds the position of the cursor within that element
       * @see http://stackoverflow.com/questions/4811822/get-a-ranges-start-and-end-offsets-relative-to-its-parent-container/4812022#4812022
       */
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
