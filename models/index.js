// models/index.js
const Todo = require("./todoModel");
const Note = require("./noteModel");
const User = require("./userModel");
const isPasswordCorrect = require("./userModel");
const generateAccessToken = require("./userModel");

module.exports = {
  Todo,
  Note,
  User,
  isPasswordCorrect,
  generateAccessToken,
};
