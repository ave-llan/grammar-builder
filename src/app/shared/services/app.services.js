var angular = require('angular');

module.exports = angular.module('app.services', [])
  .factory('grammarService', require('./grammar-service.js'));
