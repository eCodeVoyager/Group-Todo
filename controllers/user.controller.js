const asyncHandler = require("../utils/asyncHandler");
const userModel = require("../models/index");
const ApiResponse = require("../utils/ApiResponse");
const ApiError = require("../utils/ApiError");

// Generate access and refresh tokens Method
const generateAccessAndRefreshToken = async (userId) => {
  try {
    const user = await userModel.User.findOne(userId);
    if (!user) {
      throw new ApiError(404, "User Not Found", "User not found");
    }
    const accessToken = await user.generateAccessToken();
    const refreshToken = await user.generateRefreshToken();
    user.refresh_token = refreshToken;
    await user.save({ validateBeforeSave: false });

    return { accessToken, refreshToken };
  } catch (error) {
    throw new ApiError(
      500,
      "Failed to generate tokens",
      "Something went wrong"
    );
  }
};

// User registration controller
const userRegistration = asyncHandler(async (req, res) => {
  const { email, password, name } = req.body;

  // Verify if email and password are provided
  if (!email || !password) {
    throw new ApiError(
      400,
      "Failed to create user",
      "Missing email or password"
    );
  }

  // Verify if email already exists
  const existingUser = await userModel.User.findOne({ email });

  if (existingUser) {
    throw new ApiError(
      400,
      "Failed To Create User",
      "Email already used by another user"
    );
  }

  // Verify if the password is at least 8 characters long
  if (password.length < 8) {
    throw new ApiError(
      400,
      "Failed To Create User",
      "Password must be at least 8 characters long"
    );
  }

  // Create user in the db
  const user = await userModel.User.create({
    email,
    password,
    name,
  });
  if (!user) {
    throw new ApiError(500, "Failed to create user", "Database error occurred");
  }
  //Token generation
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await userModel.User.findOne(user._id).select(
    "-password -refresh_token"
  );
  //sending Cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User Register Successfully and Logged"
      )
    );
});

// User login controller

const userLogin = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  //verify if email and password are provided
  if (!email || !password) {
    throw new ApiError(
      400,
      "Failed to login user",
      "Missing email or password"
    );
  }

  //verify if email exists
  const user = await userModel.User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Failed To Login User", "User Not Found");
  }

  //verify if password is correct
  const isMatch = await user.isPasswordCorrect(password);

  if (!isMatch) {
    throw new ApiError(400, "Failed To Login User", "Invalid password");
  }
  //Token generation
  const { accessToken, refreshToken } = await generateAccessAndRefreshToken(
    user._id
  );
  const loggedInUser = await userModel.User.findOne(user._id).select(
    "-password -refresh_token"
  );
  //sending Cookies
  const options = {
    httpOnly: true,
    secure: true,
  };
  return res
    .status(200)
    .cookie("refreshToken", refreshToken, options)
    .cookie("accessToken", accessToken, options)
    .json(
      new ApiResponse(
        200,
        { loggedInUser, accessToken, refreshToken },
        "User Logged In Successfully"
      )
    );
});

// User logout controller
const userLogout = asyncHandler(async (req, res) => {
  id = req.user._id;
  if (!id) {
    throw new ApiError(401, "User Not Found", "already logged out");
  }
  await userModel.User.findByIdAndUpdate(
    req.user._id,
    { $set: { refresh_token: "" } },
    { new: true, useFindAndModify: false }
  );
  const options = {
    httpOnly: true,
    secure: true,
  };

  return res
    .clearCookie("refreshToken", options)
    .clearCookie("accessToken", options)
    .status(200)
    .json({
      success: true,
      message: "User Logged Out Successfully",
    });
});

//user Password reset controller
const userPasswordReset = asyncHandler(async (req, res) => {
  const { email, password } = req.body;

  // Verify if email is provided
  if (!email) {
    throw new ApiError(400, "Failed to reset password", "Missing email");
  }

  // Verify if email exists
  const user = await userModel.User.findOne({ email });

  if (!user) {
    throw new ApiError(404, "Failed To Reset Password", "User Not Found");
  }

  // Verify if the password is at least 8 characters long
  if (password.length < 8) {
    throw new ApiError(
      400,
      "Failed To Reset Password",
      "Password must be at least 8 characters long"
    );
  }

  // Verify if the new password is different from the old password
  if (user.password === password) {
    throw new ApiError(
      400,
      "Failed To Reset Password",
      "New password must be different from the old password"
    );
  }

  // Change user password in the database
  user.password = password;
  user.passwordResetOTP = null;
  user.emailVerificationSecret = null;
  user.updated_at = Date.now();

  await user.save({ validateBeforeSave: false });

  // Send success response
  return res.status(200).json({
    success: true,
    message: "Password Reset Successfully",
  });
});

// Email verification controller
const verifyEmail = asyncHandler(async (req, res) => {
  const { token } = req.query;

  if (!token) {
    throw new ApiError(
      400,
      "Invalid token",
      "Token is required for email verification"
    );
  }

  const user = await userModel.User.findOne({ emailVerificationSecret: token });

  if (!user) {
    throw new ApiError(
      404,
      "User not found",
      "No user found for the provided token"
    );
  }

  // Mark the user as verified and remove the verification token
  user.email_verified = true;
  user.emailVerificationSecret = undefined;
  await user.save();

  return res.status(200).json({
    success: true,
    message: "Email verified successfully.",
  });
});

module.exports = {
  userRegistration,
  userLogin,
  userLogout,
  userPasswordReset,
  verifyEmail,
};
