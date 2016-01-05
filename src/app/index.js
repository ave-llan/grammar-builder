'use strict';
var angular = require('angular')
  , directives = require('./shared/app.directives.js')
  , filters = require('./shared/filters/app.filters.js')
  , builder = require('./components/builder');

/**
 * @see https://google.github.io/styleguide/angularjs-google-style.html
 */

var grammarBuilderApp = angular.module('grammarBuilder', [
  require('angular-ui-router'),
  directives.name,
  filters.name,
  builder.name
]);

// config with routes
grammarBuilderApp.config(require('./app.routes.js'));
