var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var HistorySchema = new Schema({
    date: String,
    maxtempC: String,
    mintempC: String
});

var History = mongoose.model('History', HistorySchema);

module.exports = History;

