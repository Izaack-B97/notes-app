const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const noteSchema = new Schema({
    title: { 
        type: String , 
        required: true},
    description: {
        type: String,
        required: true
    }
}, {
    timestamps: true // Te agrega el create_at and update_at
});

const Note = mongoose.model('Note', noteSchema);

module.exports = Note;