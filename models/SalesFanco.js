var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SalesSchema = new Schema({
    WeekOf: String,
    City: String,
    Neighborhood: String,
    Product: String,
    SKU: String,
    Channel: String,
    SalesUnits: {type: Number, default: 0}
});

var Sales = mongoose.model('Sales', SalesSchema);

module.exports = Sales;