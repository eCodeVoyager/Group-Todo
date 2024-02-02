const asyncHandler = require("../utils/asyncHandler");

const JokeArray = asyncHandler(async (req, res) => {
  res.send({
    success: true,
    error: true,
    message: "Joke On You Mate. Read APIs Doc :) !",
  });
});
module.exports = { JokeArray };
