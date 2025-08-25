const express = require('express');
const router = express.Router();
const notesController = require('../controllers/NotesController');

router.post('/', notesController.createNote);
router.get('/', notesController.getAllNote);
router.get('/:id', notesController.getNoteById);
router.patch('/:id', notesController.updateNote);
router.delete('/:id', notesController.deleteNote);

module.exports = router;