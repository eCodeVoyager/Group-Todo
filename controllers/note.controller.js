const { get } = require('../configs/nodemailer.config');
const Models = require('../models/index');
const ApiError = require('../utils/ApiError');
const asyncHandler = require('../utils/asyncHandler');



// Create a new Note
const createNote = asyncHandler(async (req, res) => {
  const { title, content } = req.body;
  if (!title || !content) {
    throw new ApiError(400, 'Failed to create note', 'Missing title or content');
  }

  const newNote = new Models.Note({
    title,
    content,
    created_by: req.user._id
  });

  await Models.User.updateOne(
    { _id: req.user._id },
    { $push: { notes: newNote._id } }
  );

  const note = await newNote.save();
  res.status(201).json({
    success: true,
    data: note,
  });
});

const getNotes = asyncHandler(async (req, res) => {
    const notes = await Models.Note.find({ created_by: req.user._id });
    res.status(200).json({
        success: true,
        data: notes,
    });
    });

module.exports = { createNote, getNotes};
