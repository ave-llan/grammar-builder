module.exports = function () {
  return function (input, seperator, isNonTerminal) {
    console.log('filter called:', input, seperator);
    var a =  input.split(seperator).map(function (definitionPart) {
      return '<span class="definitionPart' +
                   (isNonTerminal(definitionPart) ? ' non-terminal">'
                                                  : '">') +
                   definitionPart +
                   '</span>';
    }).join(seperator);
    console.log(a);
    return a;
  };
};