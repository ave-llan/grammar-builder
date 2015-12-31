var angular = require('angular');

module.exports = angular.module('builder', [])
  .controller('BuilderCtrl', require('./controllers/builderctrl.js'));
