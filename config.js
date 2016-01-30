'use strict';

module.exports = {
  port        : process.env.PORT || 8080,
  dataBackend : 'datastore',
  gcloud      : {
    projectId: 'grammar-graph'
  }

};
