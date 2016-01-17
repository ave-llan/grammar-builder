var angular = require('angular');

module.exports = angular.module('app.services', [])
  .factory('grammarFactory', require('./grammar-factory.js'));
