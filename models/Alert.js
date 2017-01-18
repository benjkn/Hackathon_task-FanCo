var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var TextSchema = new Schema({
  alert: String
});

var Text = mongoose.model('duckface', TextSchema);


module.exports = Text;
