'use strict';

var express = require('express');

var app = express();


// Say hello!
app.get('/', function(req, res) {
  res.sendFile('dist/index.html', { root: __dirname });
  // res.status(200).send('Hello, world!');
});

app.use(express.static('dist'));


// [START server]
// Start the server
var server = app.listen(process.env.PORT || 8080, function () {
  var host = server.address().address;
  var port = server.address().port;

  console.log('App listening at http://%s:%s', host, port);
});
// [END server]
