var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var PricesSchema = new Schema({
	Product: String,
  SKU: String,
  Channel: String,
  RevenuePerUnitSold: {type: Number, default: 0}
});

var Price = mongoose.model('price', PricesSchema);


module.exports = Price;