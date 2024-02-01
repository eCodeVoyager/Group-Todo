var express = require("express");
var userRouter = express.Router();

const { userRegistration } = require("../controllers/user.controller");

userRouter.get("/register", userRegistration);

module.exports = userRouter;