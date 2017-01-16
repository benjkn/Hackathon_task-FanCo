var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SalesSchema = new Schema({
  WeekOf: String,
  Neighborhood: String,
  SKU: String,
  Channel: String,
  SalesUnits: {type: Number, default: 0}
});

var Sales = mongoose.model('Sales', SalesSchema);


module.exports = Sales;
