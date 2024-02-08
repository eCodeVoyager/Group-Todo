var express = require("express");
const { JokeArray } = require("../utils/JokeArray");
const { verifyEmail } = require("../controllers/user.controller");
const { generateVerificationToken } = require("../middlewares/mailsender.middleware");
var indexRouter = express.Router();

indexRouter.get("/", JokeArray);
//indexRouter.put("*/", JokeArray);
indexRouter.post("/", JokeArray);
//indexRouter.patch("*/", JokeArray);
//indexRouter.delete("*/", JokeArray);
indexRouter.get("/verify-email", verifyEmail);
indexRouter.post("/generate-verification-token", generateVerificationToken);


module.exports = indexRouter;
