const userModel = require("../models/index");
const ApiError = require("../utils/ApiError");
const speakeasy = require("speakeasy");
const asyncHandler = require("../utils/asyncHandler");

// Request email verification
const verifyEmailWithOTP = asyncHandler(async (req, res) => {
  const { otp, email } = req.body;

  if (!otp) {
    throw new ApiError(400, "Please Input OTP", "OTP Missing");
  }

  const user = await userModel.User.findOne({ email: email });
  console.log(user);
  if (!user) {
    throw new ApiError(404, "User Not Found", "User not found");
  }




  const isValid = speakeasy.totp.verify({
    secret: user.emailVerificationSecret,
    encoding: "base32",
    token: otp,
    window: 2,
    time: Date.now(), 
  });



  if (isValid === false) {
    throw new ApiError(400, "Invalid OTP", "Invalid OTP");
  }

  // Mark the email as verified
  user.email_verified = true;
  await user.save();

  res.status(200).json({
    success: true,
    message: "Email verification successful",
  });
});

module.exports = { verifyEmailWithOTP };
