const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/index");
const ApiResponse = require("../utils/ApiResponse");
const errorHandler = require("../middlewares/errorHandler.middleware");
const ApiError = require("../utils/ApiError");

//user registration controller
const userRegistration = asyncHandler(async (req, res) => {
  const { username, password } = req.body;

  //verify if username and password are provided
  if (!username || !password) {
    throw new ApiError(
      400,
      "Failed to create user",
      "Missing username or password"
    ); // ApiError && Api Response Send the response object as a JSON
  }

  //verify if username already exists
  const existingUser = await userModel.User.findOne({ username }); //db query ***as tho its eat resource :) ***

  if (existingUser) {
    throw new ApiError(400, "Failed To Create User", "Username already exists");
  }
  //verify if username is at least 8 characters long
  if (password.length < 8) {
    throw new ApiError(
      400,
      "Failed To Create User",
      "Password must be at least 8 characters long"
    );
  }

  //create user in db
  const user = await userModel.User.create({ username, password });

  throw new ApiResponse(201, user, "User Created Successfully");
});

module.exports = { userRegistration };
