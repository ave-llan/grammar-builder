var GrammarGraph = require('grammar-graph');

var BuilderCtrl = [ '$scope', '$interval', '$http',
  function($scope , $interval, $http ) {
    $scope.grammar = {};

    // for now, pull sample grammar
    $http.get('./assets/data/grammars/sample-grammar.json').then(function (response) {
      $scope.grammar = response.data;
      $scope.startSymbol = 'Sentence';
    }, function (response) {
      console.log('there was an error:', response);
    });
    $scope.startSymbol;      // where should guides start their construction?
    $scope.sentence;         // a sample sentence from this grammar
    $scope.editingDefinition = false;  // is an already defined definition being edited?
    $scope.targetDefinition = {symbol: null, index: null };

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

    $scope.editNonTerminal = function (nonTerminal) {
      console.log('you clicked', nonTerminal);
    };

    // update the definition of a symbol at the given index
    $scope.editDefinition = function (symbol, index, definition) {
      console.log('you clicked editDefinition', symbol, index, definition);
      $scope.symbol = symbol;
      $scope.definition = $scope.grammar[symbol][index];
      setTargetDefinition(symbol, index);
      $scope.editingDefinition = true;
      // $scope.grammar[symbol][index] = definition;
      // $scope.generateRandomSentence(); // make new sentence
    };

    $scope.updateDefinition = function () {
      $scope.grammar[$scope.targetDefinition.symbol][$scope.targetDefinition.index] = $scope.definition;
    };

    $scope.submitDefinitionEdit = function () {
      $scope.cancelEdit(); // because the model will be updated as user types, we just need to cancel here
    };

    $scope.cancelEdit = function () {
      $scope.editingDefinition = false;
      $scope.symbol = '';
      $scope.definition = '';
    };

    // is this definition being edited? 
    /**
     *
     * @param {string} symbol - the symbol in question
     * @param {number} [definitionIndex] - optional definition index
     * @returns {boolean} if just symbol, is this the target symbol? else
     */
    $scope.isEditTarget = function (symbol, definitionIndex) {
      if ($scope.editingDefinition && $scope.targetDefinition.symbol == symbol) {
        if (typeof definitionIndex !== 'undefined' &&
            $scope.targetDefinition.index == definitionIndex) {
          return true;
        } else {
          return true; // no definitionIndex provided, and symbol matches
        }
      }
      return false;
    };

    // set target definition to the specific symbol and index for live previews
    function setTargetDefinition (symbol, index) {
      $scope.targetDefinition.symbol = symbol;
      $scope.targetDefinition.index = index;
    }

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
