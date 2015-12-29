'use strict';
var angular = require('angular');

var grammarBuilderApp = angular.module('grammarBuilder', [
  require('angular-ui-router')
]);

// controllers
grammarBuilderApp.controller('BuilderCtrl', require('./components/builder/builderctrl.js'));

// directives
grammarBuilderApp.directive('definition', require('./shared/definition/definition_dir.js'));

// config with routes
grammarBuilderApp.config(require('./app.routes.js'));
