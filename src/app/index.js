'use strict';
var angular = require('angular')
  , builder = require('./components/builder');

/**
 * @see https://google.github.io/styleguide/angularjs-google-style.html
 */

var grammarBuilderApp = angular.module('grammarBuilder', [
  require('angular-ui-router'),
  builder.name
]);

// directives
grammarBuilderApp.directive('definition', require('./shared/definition/definition_dir.js'));

// config with routes
grammarBuilderApp.config(require('./app.routes.js'));
