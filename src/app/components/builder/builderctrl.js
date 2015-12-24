// var GrammarGraph = require('grammar-graph');

var BuilderCtrl = [ '$scope', '$interval',
  function($scope /*, $interval */) {
    $scope.message = 'this message brought to you from an Angular controller';
    $scope.grammar = {};
    $scope.startSymbol;      // where should guides start their construction?
    // var graph;            // a grammarGraph made with current grammar

    // add a new definition to grammar and refresh guide
    $scope.addNewDefinition = function (symbol, definition) {
      if (!(symbol && definition)) return;
      if (!(symbol in $scope.grammar))
        $scope.grammar[symbol] = [];
      $scope.grammar[symbol].push(definition);
      $scope.definition = ''; // clear definition but leave symbol

      // graph = new GrammarGraph($scope.grammar); // refresh guide
      // guide = graph.createGuide()
    };

    // is the given symbol a non-terminal?
    $scope.isNonTerminal = function (symbol) {
      return (symbol in $scope.grammar);
    };




    // var grammar = {
    //   Sentence: ['NounPhrase VerbPhrase'],
    //   NounPhrase: ['the Noun',
    //          'the Noun RelativeClause'],
    //   VerbPhrase: ['Verb',
    //          'Verb NounPhrase'],
    //   RelativeClause: ['that VerbPhrase'],
    //   Noun: ['dog',
    //          'cat',
    //          'bird',
    //          'squirrel'],
    //   Verb: ['befriended',
    //          'loved',
    //          'ate',
    //          'attacked']
    // };
    // var graph = new GrammarGraph(grammar);
    // $scope.grammar = grammar;
    // var guide = graph.createGuide('Sentence');
    // $scope.sentence = '';
    // $scope.vertices = graph.vertices();
    // function addWord () {
    //   if (guide.choices()) {
    //     var choices = guide.choices();
    //     var choice = choices[Math.floor(Math.random() * choices.length)];
    //     guide.choose(choice);
    //     $scope.sentence += ' ' + choice;
    //   }
    // }

    // function generateRandomSentence (guide) {
    //   while (guide.choices() && !guide.isComplete()) {
    //     var choices = guide.choices();
    //     guide.choose(choices[Math.floor(Math.random() * choices.length)]);
    //   }
    //   return guide.construction().join(' ');
    // }

    // $interval(addWord, 400);
  }
];

module.exports = BuilderCtrl;
