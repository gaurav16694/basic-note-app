var mongoose = require('mongoose');

var db = require('../mongoconnection');


let noteSchema = new mongoose.Schema({
    user_id: {type: String, required: true},
    text: {type: String, required: true},
    created_at:{type: String, required: true}
});
var Note = mongoose.model('Note',noteSchema);

module.exports = Note;