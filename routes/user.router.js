var express = require("express");
var userRouter = express.Router();
const errorHandler = require("../middlewares/errorHandler.middleware");
const { userRegistration } = require("../controllers/user.controller");



//user registration route
userRouter.post("/register", userRegistration);











userRouter.use(errorHandler);

module.exports = userRouter;
