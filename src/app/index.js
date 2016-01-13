'use strict';
var angular = require('angular')
  , directives = require('./shared/app.directives.js')
  , services = require('./shared/services/app.services.js')
  , filters = require('./shared/filters/app.filters.js')
  , constants = require('./shared/constants/app.constants.js')
  , builder = require('./components/builder');

/**
 * @see https://google.github.io/styleguide/angularjs-google-style.html
 */

var grammarBuilderApp = angular.module('grammarBuilder', [
  require('angular-ui-router'),
  services.name,
  directives.name,
  filters.name,
  constants.name,
  builder.name
]);

// config with routes
grammarBuilderApp.config(require('./app.routes.js'));
