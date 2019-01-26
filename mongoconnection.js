var mongoose = require('mongoose');
var mongoconnection = mongoose.connect('mongodb://127.1.0.1:27017/note_app',{ useNewUrlParser: true });
module.exports = mongoconnection;