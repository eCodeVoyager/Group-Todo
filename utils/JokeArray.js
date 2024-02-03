

const JokeArray = async (req, res,next) => {
  res.send({
    success: true,
    error: true,
    message: "Joke On You Salman || Sanaur. Read APIs Doc :) !",
  });
  next();
};
module.exports = { JokeArray };
