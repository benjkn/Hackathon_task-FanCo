var express = require('express');
var bodyParser = require('body-parser');
var mongoose = require('mongoose');

mongoose.connect(process.env.MONGOLAB_JADE_URI || 'mongodb://localhost/fanco');

//change to mongoose default promises lib, when you call .then
mongoose.Promise = global.Promise;

var routes = require('./routes/index');

var app = express();

app.use(express.static('public'));
app.use(express.static('node_modules'));

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use('/', routes);

		/*
		***************CAUTION --- if u uncomment and run this, overwrites forecast.json file
		fs.writeFile('data/forecast.json', body, 'utf8', function (err) {
	  		if (err) return console.log(err);
	  		console.log('dasf');
		});*/

var port = process.env.PORT || '7000';

app.listen(port, function () {
  console.log('ok! On: localhost:' + port);
});