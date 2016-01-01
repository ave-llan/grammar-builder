var angular = require('angular');

module.exports = angular.module('app.directives', [])
  .directive('definition', require('./definition/definition_dir.js'));
