var express = require("express");
var noteRouter = express.Router();
const errorHandler = require("../middlewares/errorHandler.middleware");
const {
  createNote,
  getNotes,
  getNote,
  updateNote,
  deleteNote,
} = require("../controllers/note.controller");
const isUserLoggedin = require("../middlewares/isUserLoggedin.middleware");




noteRouter.post("/create", isUserLoggedin ,createNote);
noteRouter.get("/getnotes", isUserLoggedin, getNotes);

noteRouter.use(errorHandler);

module.exports = noteRouter;