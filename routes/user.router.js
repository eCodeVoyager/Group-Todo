var express = require("express");
var userRouter = express.Router();
const errorHandler = require("../middlewares/errorHandler.middleware");
const {
  userRegistration,
  userLogin,
  userLogout,
  userPasswordReset,
} = require("../controllers/user.controller");
const { JokeArray } = require("../utils/JokeArray");
const isUserLoggedin = require("../middlewares/isUserLoggedin.middleware");

const { verifyPasswordResetOTP, sendPasswordResetOTP } = require("../middlewares/PassReset.middleware");
//user registration route
userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/verify", verifyPasswordResetOTP, userPasswordReset);
userRouter.post("/reset", sendPasswordResetOTP);



//Secure routes
userRouter.post("/logout", isUserLoggedin, userLogout);
userRouter.get("/autho", isUserLoggedin, (req, res) => {
  res.send({ message: "You are authorized to access this route" });
});

//Handle Get requests to /user
//userRouter.get("*/", JokeArray);
//Handle Unknown POST requests to /user
userRouter.post("*/", JokeArray);
userRouter.use(errorHandler);

module.exports = userRouter;
