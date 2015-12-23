'use strict';
var angular = require('angular');


var grammarBuilderApp = angular.module('grammarBuilder', [
  require('angular-ui-router')
]);

// controllers
var BuilderCtrl = require('./components/builder/builderctrl.js');
grammarBuilderApp.controller('BuilderCtrl', BuilderCtrl);

// config with routes
grammarBuilderApp.config(require('./app.routes.js'));
