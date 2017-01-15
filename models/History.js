var mongoose = require('mongoose');

var HistorySchema = new mongoose.Schema({
  date: String,
  maxtempC: String,
  mintempC: String
});

var History = mongoose.model('History', HistorySchema,"History");

module.exports = History;

