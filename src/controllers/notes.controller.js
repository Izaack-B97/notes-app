const Note = require('../models/Note');

const notesController = {};

notesController.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesController.createNewNote = async (req, res) => {
    try {
        const { title, description } = req.body;
    
        let newNote = new Note({ title, description });
        // console.log(newNote);
        let result = await newNote.save();
        res.redirect('/notes');
    } catch (error) {
      res.status(500).json(error);
  }

    
};

notesController.renderNotes = async (req, res) => {
    try {
        let notas = await Note.find();
        res.render('notes/all-notes', { notas });
    } catch (error) {
        
    }
};

notesController.renderEditForm = async (req, res) => {
    try {
        let id = req.params.id;
        let nota = await Note.findById(id);        

        res.render('notes/edit-note', { nota });
    } catch (error) {
        res.status(500).json(error);
    }
};

notesController.updateNote = async (req, res) => {
    try {
        let id = req.params.id;
        const { title, description } = req.body;
        const result = await Note.updateOne({ _id: id }, { $set:  {title, description} });
        res.redirect('/notes');
    } catch (error) {
        res.status(500).json(error);
    }
};

notesController.deleteNote = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Note.findByIdAndDelete(id);
        res.redirect('/notes');        
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = notesController;