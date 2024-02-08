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
noteRouter.put("/update/:id", isUserLoggedin, updateNote);
noteRouter.delete("/delete/:id", isUserLoggedin, deleteNote);

//get routes for notes
noteRouter.get("/getnotes", isUserLoggedin, getNotes);
noteRouter.get("/getnote/:id", isUserLoggedin, getNote);	

noteRouter.use((req, res, next) => {
  res.status(404).json({ success: false, error: "Route not found" });
});


module.exports = noteRouter;