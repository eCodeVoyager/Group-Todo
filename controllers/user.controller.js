const asyncHandler = require("../utils/asyncHandler");

const userRegistration = asyncHandler(async (req, res) => {
  res.send("User Registration");
});

const JokeArray = asyncHandler(async (req, res) => {
  res.send({
    success: true,
    error: true,
    message: "Joke On You Mate. Read APIs Doc :) !",
  });
});

module.exports = { userRegistration, JokeArray };
