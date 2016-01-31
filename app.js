'use strict';

var express = require('express')
  , session = require('cookie-session')
  , config  = require('./config');

var app = express();

app.use(session({
  secret: config.secret,
  signed: true
}));

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
