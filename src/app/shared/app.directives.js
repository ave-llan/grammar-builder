var angular = require('angular')
  , customControl = require('./contenteditable/contenteditable_dir.js');

module.exports = angular.module('app.directives',
  [customControl.name])
  .directive('definition', require('./definition/definition_dir.js'));
