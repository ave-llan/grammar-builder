var GrammarGraph = require('grammar-graph');

var BuilderCtrl = [ '$scope', '$interval', '$http', 'grammarService',
  function($scope , $interval, $http, grammarService) {
    $scope.grammar = {};
    $scope.title = 'Your first grammar';
    $scope.view = 'builder';

    // // for now, pull sample grammar
    // $http.get('./assets/data/grammars/sample-grammar.json').then(function (response) {
    //   $scope.grammar = response.data;
    //   $scope.startSymbol = 'Sentence';
    // }, function (response) {
    //   console.log('there was an error:', response);
    // });
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

    $scope.setView = function (view) {
      $scope.view = view;
    };

    // is the given symbol a non-terminal?
    $scope.isNonTerminal = function (symbol) {
      return (symbol in $scope.grammar);
    };

    $scope.editNonTerminal = function (nonTerminal) {
      console.log('you clicked', nonTerminal);
    };

    // update the definition of a symbol at the given index
    $scope.editDefinition = function (symbol, index) {
      $scope.symbol = symbol;
      $scope.definition = $scope.grammar[symbol][index];
      setTargetDefinition(symbol, index);
      $scope.editingDefinition = true;
      // $scope.grammar[symbol][index] = definition;
      // $scope.generateRandomSentence(); // make new sentence
    };

    $scope.updateDefinition = function (definition) {
      $scope.grammar[$scope.targetDefinition.symbol][$scope.targetDefinition.index] = definition;
    };

    $scope.submitDefinitionEdit = function () {
      $scope.cancelEdit(); // because the model will be updated as user types, we just need to cancel here
    };

    $scope.cancelEdit = function () {
      $scope.editingDefinition = false;
      $scope.symbol = '';
      $scope.definition = '';
      console.log('setting $scope.definition to empty');
    };

    // is this definition being edited?
    /**
     *
     * @param {string} symbol - the symbol in question
     * @param {number} [definitionIndex] - optional definition index
     * @returns {boolean} if just symbol, is this the target symbol? else
     */
    $scope.isEditTarget = function (symbol, definitionIndex) {
      if (!$scope.editingDefinition) return false;

      if (typeof definitionIndex === 'undefined') {
        if ($scope.targetDefinition.symbol == symbol)
          return true;
      } else {
        if ($scope.targetDefinition.symbol == symbol &&
            $scope.targetDefinition.index == definitionIndex) {
          return true;
        }
      }
      return false;
    };

    $scope.generateRandomSentence = function () {
      $interval.cancel(sentenceInterval);
      graph = new GrammarGraph($scope.grammar); // refresh guide
      guide = graph.createGuide($scope.startSymbol);

      $scope.sentence = '';
      sentenceInterval = $interval(addWord, 1000);
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

    function onGrammarSet (error, grammarModel) {
      console.log('onGrammarSet:', error, grammarModel);
      if (!error) {
        $scope.grammar = grammarModel.grammar;
        console.log('$scope.grammar:', $scope.grammar);
        $scope.startSymbol = grammarModel.start;
        $scope.title = grammarModel.name;
      }
    }

    function getGrammar () {
      grammarService.get(onGrammarSet);
    }
    getGrammar();
  }

];

module.exports = BuilderCtrl;
