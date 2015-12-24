var GrammarGraph = require('grammar-graph');

var BuilderCtrl = [ '$scope', '$interval',
  function($scope , $interval ) {
    $scope.message = 'this message brought to you from an Angular controller';
    $scope.grammar = {};
    $scope.startSymbol;      // where should guides start their construction?
    $scope.sentence;         // a sample sentence from this grammar

    var graph;               // a grammarGraph made with current grammar
    var guide;               // the current guide
    var sentenceInterval;    // sentence refresh promosie

    // add a new definition to grammar and refresh guide
    $scope.addNewDefinition = function (symbol, definition) {
      if (!(symbol && definition)) return;
      if (!$scope.startSymbol) $scope.startSymbol = symbol; // initialize
      if (!(symbol in $scope.grammar))
        $scope.grammar[symbol] = [];                        // initialize this non-terminal
      $scope.grammar[symbol].push(definition);
      $scope.definition = '';                               // clear definition but leave symbol

      $scope.generateRandomSentence();
    };

    // is the given symbol a non-terminal?
    $scope.isNonTerminal = function (symbol) {
      return (symbol in $scope.grammar);
    };

    // add a word to the sample sentence
    function addWord () {
      if (guide.choices().length > 0) {
        var choices = guide.choices();
        var choice = choices[Math.floor(Math.random() * choices.length)];
        guide.choose(choice);
        $scope.sentence += ' ' + choice;
      } else {
        $interval.cancel(sentenceInterval);
        if (guide.isComplete()) {
          $scope.sentence += '.'; // if complete, add period.
        }
      }
    }

    $scope.generateRandomSentence = function () {
      $interval.cancel(sentenceInterval);
      graph = new GrammarGraph($scope.grammar); // refresh guide
      guide = graph.createGuide($scope.startSymbol);

      $scope.sentence = '';
      sentenceInterval = $interval(addWord, 1000);
    };
  }
];

module.exports = BuilderCtrl;
