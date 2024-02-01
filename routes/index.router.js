var express = require("express");
const { JokeArray } = require("../controllers/user.controller");
var indexRouter = express.Router();

indexRouter.get("/", JokeArray);

module.exports = indexRouter;
