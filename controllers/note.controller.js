
const Models = require("../models/index");
const ApiError = require("../utils/ApiError");
const asyncHandler = require("../utils/asyncHandler");

// Create a new Note
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;

  try {
    if (!title || !content) {
      throw new ApiError(400, "Title and Content are required");
    } else if (title.length < 3 || content.length < 3) {
      throw new ApiError(
        400,
        "Title and Content should be at least 3 characters"
      );
    }

    const newNote = new Models.Note({
      title,
      content,
      created_by: req.user._id,
    });

    await Models.User.updateOne(
      { _id: req.user._id },
      { $push: { notes: newNote._id } }
    );

    const note = await newNote.save();
    res.status(201).json({
      success: true,
      data: note,
      message: "Note created successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});
// Update a note
const updateNote = asyncHandler(async (req, res) => {
  try {
    const note = await Models.Note.findById(req.params.id);

    if (!note) {
      throw new ApiError(404, "Note not found");
    }

    if (note.created_by.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to update this note");
    }

    note.title = req.body.title || note.title;
    note.content = req.body.content || note.content;

    const updatedNote = await note.save();
    res.status(200).json({
      success: true,
      data: updatedNote,
      message: "Note updated successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
  }
});
// Delete a note
const deleteNote = asyncHandler(async (req, res) => {
  try {
    const note = await Models.Note.findById(req.params.id);

    if (!note) {
      throw new ApiError(404, "Note not found");
    }

    if (note.created_by.toString() !== req.user._id.toString()) {
      throw new ApiError(403, "You are not authorized to delete this note");
    }
    
    await note.deleteOne({ _id: req.params.id });

    res.status(200).json({
      success: true,
      message: "Note deleted successfully",
    });
  } catch (error) {
    res.status(error.statusCode || 500).json({ error: error.message });
    console.log(error);
  }
});

// Get all notes for a user
const getNotes = asyncHandler(async (req, res) => {
  const notes = await Models.Note.find({ created_by: req.user._id });
  res.status(200).json({
    success: true,
    data: notes,
  });
});

// Get a single note
const getNote = asyncHandler(async (req, res) => {
  try {
    const note = await Models.Note.findById(req.params.id);

    if (!note) {
      throw new ApiError(404, "Note not found");
    }

    res.status(200).json({
      success: true,
      data: note,
    });
  } catch (error) {
    throw new ApiError(500, "Invalid ID", error.message);
  }
});

module.exports = { createNote, getNotes, getNote, updateNote, deleteNote };
