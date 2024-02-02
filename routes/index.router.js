var express = require("express");
const { JokeArray } = require("../utils/JokeArray");
var indexRouter = express.Router();

indexRouter.get("/", JokeArray);

module.exports = indexRouter;
