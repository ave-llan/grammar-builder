var angular = require('angular');

module.exports = angular.module('app.filters', [ require('angular-sanitize') ])
  .filter('definitionHighlight', require('./definition_highlight_filter.js'));
