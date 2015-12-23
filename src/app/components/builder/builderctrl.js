var GrammarGraph = require('grammar-graph');

var BuilderCtrl = [ '$scope', '$interval',
  function($scope, $interval) {
    $scope.message = 'this message brought to you from an Angular controller';

    var grammar = {
      Sentence: ['NounPhrase VerbPhrase'],
      NounPhrase: ['the Noun',
             'the Noun RelativeClause'],
      VerbPhrase: ['Verb',
             'Verb NounPhrase'],
      RelativeClause: ['that VerbPhrase'],
      Noun: ['dog',
             'cat',
             'bird',
             'squirrel'],
      Verb: ['befriended',
             'loved',
             'ate',
             'attacked']
    };
    var graph = new GrammarGraph(grammar);
    $scope.grammar = grammar;
    var guide = graph.createGuide('Sentence');
    $scope.sentence = '';
    $scope.vertices = graph.vertices();
    function addWord () {
      if (guide.choices()) {
        var choices = guide.choices();
        var choice = choices[Math.floor(Math.random() * choices.length)];
        guide.choose(choice);
        $scope.sentence += ' ' + choice;
      }
    }

    // function generateRandomSentence (guide) {
    //   while (guide.choices() && !guide.isComplete()) {
    //     var choices = guide.choices();
    //     guide.choose(choices[Math.floor(Math.random() * choices.length)]);
    //   }
    //   return guide.construction().join(' ');
    // }

    $interval(addWord, 400);
  }
];

module.exports = BuilderCtrl;
