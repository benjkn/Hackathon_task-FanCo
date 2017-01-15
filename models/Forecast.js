var mongoose = require('mongoose');

var ForecastSchema = new mongoose.Schema({
  dt: Number,
  day: Number
});

var Forecast = mongoose.model('forecast', ForecastSchema);

module.exports = Forecast;