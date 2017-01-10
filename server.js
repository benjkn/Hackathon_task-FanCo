var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var path = require('path');

mongoose.connect(process.env.MONGOLAB_ROSE_URI || 'mongodb://localhost/fanco');

var routes = require('./routes/index');
// var users = require('./routes/users'); ********** uncomment to add user registration

var app = express();

app.use(express.static('public'))
app.use(express.static('node_modules'))

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);
// app.use('/users', users); ********** uncomment to add user registration

var port = process.env.PORT || '7000';

app.listen(port, function () {
  console.log('ok! On: localhost:' + port)
});