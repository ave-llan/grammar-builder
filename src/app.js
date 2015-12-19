'use strict';
var angular = require('angular');
var GrammarGraph = require('grammar-graph');

var grammarBuilderApp = angular.module('grammarBuilder', []);

grammarBuilderApp.controller('grammarBuilderCtrl',function($scope) {
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
  var graph = new GrammarGraph(grammar)

  $scope.vertices = graph.vertices();

});
