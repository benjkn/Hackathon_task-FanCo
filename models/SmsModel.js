var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SmsSchema = new Schema({
  username: String,
  phonenumber: String,
});

var Sms = mongoose.model('Sms', SalesSchema);


module.exports = Sms;
