var mongoose = require('mongoose');

//key names need to be changed
var ForecastSchema = new mongoose.Schema({
  day: Number,
  temp: Number
});

var Forecast = mongoose.model('forecast', ForecastSchema);

module.exports = Forecast;