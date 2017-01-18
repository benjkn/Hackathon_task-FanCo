var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var SmsSchema = new Schema({
  name: String,
  phone: String
});

var Sms = mongoose.model('message', SmsSchema);


module.exports = Sms;
