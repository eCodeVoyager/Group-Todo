var express = require("express");
var userRouter = express.Router();
const errorHandler = require("../middlewares/errorHandler.middleware");
const {
  userRegistration,
  userLogin,
  userLogout,
  userPasswordReset,
  changeUserBio,
} = require("../controllers/user.controller");
const { JokeArray } = require("../utils/JokeArray");
const isUserLoggedin = require("../middlewares/isUserLoggedin.middleware");

const {
  verifyPasswordResetOTP,
  sendPasswordResetOTP,
} = require("../middlewares/PassReset.middleware");
//user registration route
userRouter.post("/register", userRegistration);
userRouter.post("/login", userLogin);
userRouter.post("/verify-otp", verifyPasswordResetOTP, userPasswordReset);
userRouter.post("/password-reset", sendPasswordResetOTP);
userRouter.put("/update-bio", isUserLoggedin, changeUserBio);

//Secure routes
userRouter.get("/logout", isUserLoggedin, userLogout);
userRouter.get("/autho", isUserLoggedin, (_, res) => {
  res.send({ message: "You are authorized to access this route" });
});

//Handle Get requests to /user
//userRouter.get("*/", JokeArray);
//Handle Unknown POST requests to /user

userRouter.use(errorHandler);

module.exports = userRouter;
