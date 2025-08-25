const { nanoid } = require("nanoid");
const notes = require("../models/NotesModel");

const createNote = (req, res) => {
  const { title, tags, body } = req.body;
  const id = nanoid(16);
  const createdAt = new Date().toDateString();
  const updatedAt = createdAt;

  const newNote = {
    id,
    title,
    tags,
    body,
    createdAt,
    updatedAt,
  };

  notes.push(newNote);

  const isSuccess = notes.some((note) => note.id === id);

  if (isSuccess) {
    return res.status(201).json({
      status: "success",
      message: "Create note success",
      data: {
        noteId: id,
      },
    });
  }
};

const getAllNote = (req, res) => {
  res.json({
    message: "GET All Note success",
    data: {
      notes,
    },
  });
};

const getNoteById = (req, res) => {
  const { id } = req.params;

  const note = notes.filter((n) => (n.id === id))[0];

  if (note) {
    return res.json({
      status: "success",
      data: {
        note,
      },
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Id not found",
  });
};

const updateNote = (req, res) => {
  const { id } = req.params;
  const { title, tags, body } = req.body;
  const updatedAt = new Date().toDateString();

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes[index] = {
      ...notes[index],
      id,
      title,
      tags,
      body,
      updatedAt,
    };

    return res.json({
      status: "success",
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Id not found",
  });
};

const deleteNote = (req, res) => {
  const { id } = req.params;

  const index = notes.findIndex((n) => n.id === id);

  if (index !== -1) {
    notes.splice(index, 1);

    return res.json({
      status: "success",
    });
  }

  return res.status(404).json({
    status: "fail",
    message: "Id not found",
  });
};

module.exports = {
  createNote,
  getAllNote,
  getNoteById,
  updateNote,
  deleteNote,
};
