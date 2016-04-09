var express = require('express');
var app = express();

app.use(express.static('public'));

var gavelPounder = require('./lib/gavelpounder');

app.listen(3000, function () {
  console.log('Tipping app listening on port 3000!');
});
