'use strict';

var express = require('express');

var app = express();

app.get('/', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
});

app.use(express.static('dist'));


// Start the server
var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
