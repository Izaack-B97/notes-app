const Note = require('../models/Note');

const notesController = {};

notesController.renderNoteForm = (req, res) => {
    res.render('notes/new-note');
};

notesController.createNewNote = async (req, res) => {
    try {
        const { title, description } = req.body;
        let user = req.user.id;

        let newNote = new Note({ title, description });
        newNote.user = user;
        // console.log(newNote);
        let result = await newNote.save();        
        req.flash('success_msg', 'Note Added Successfully'); // Guarda un mensaje  en el servidor
        res.redirect('/notes');
    } catch (error) {
      res.status(500).json(error);
    }
};

notesController.renderNotes = async (req, res) => {
    try {
        let user_id = req.user.id
        let notas = await Note.find({user: user_id}).sort({ createdAt: 'desc'});
        res.render('notes/all-notes', { notas });
    } catch (error) {
        
    }
};

notesController.renderEditForm = async (req, res) => {
    try {
        let user_id = req.user.id;
        let id = req.params.id;
        let nota = await Note.findById(id);        

        if (nota.user === user_id){
            res.render('notes/edit-note', { nota });
        } else {
            req.flash('error_msg', 'No estas autorizado');
            res.redirect('/notes');
        }
        
    } catch (error) {
        res.status(500).json(error);
    }
};

notesController.updateNote = async (req, res) => {
    try {
        let id = req.params.id;
        const { title, description } = req.body;
        const result = await Note.updateOne({ _id: id }, { $set:  {title, description} });
        req.flash('success_msg', 'Note Updated Successfully');
        res.redirect('/notes');
    } catch (error) {
        res.status(500).json(error);
    }
};

notesController.deleteNote = async (req, res) => {
    try {
        let id = req.params.id;
        let result = await Note.findByIdAndDelete(id);
        req.flash('success_msg','Note Delete Successfully');
        res.redirect('/notes');        
    } catch (error) {
        res.status(500).json(error);
    }
};

module.exports = notesController;