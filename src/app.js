const express = require('express');
const cors = require('cors');

const notesRoute = require('./routes/NotesRoute');

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use('/notes', notesRoute);

module.exports = app;
