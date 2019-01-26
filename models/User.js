var mongoose = require('mongoose');

var db = require('../mongoconnection');

let userSchema = new mongoose.Schema({
    email: {type: String, required: true},
    password: {type: String, required: true},
    created_at:{type: String, required: true}
});
var User = mongoose.model('User',userSchema);

module.exports = User;