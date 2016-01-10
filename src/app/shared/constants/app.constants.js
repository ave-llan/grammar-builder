var angular = require('angular');

module.exports = angular.module('app.constants', [])
  .constant('TopoSort', require('./topo_sort.js'));
