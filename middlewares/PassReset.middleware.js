// Import required modules
const userModel = require("../models/index");
const ApiError = require("../utils/ApiError");
const { authenticator } = require("otplib");
const transporter = require("../configs/nodemailer.config");
const ApiResponse = require("../utils/ApiResponse");
const asyncHandler = require("../utils/asyncHandler");

const sendPasswordResetOTP = asyncHandler(async (req, res, next) => {
  try {
    const { email } = req.body;

    if (!email) {
      throw new ApiError(400, "Email is required", "Email is required");
    }

    // Check if the user exists
    const user = await userModel.User.findOne({ email: email });
    if (!user) {
      throw new ApiError(404, "User Not Found", "User not found");
    }

    // Generate a unique OTP secret for each user
    const secret = authenticator.generateSecret();
    const otp = authenticator.generate(secret);

    // Save OTP and secret in the user document
    user.passwordResetOTP = otp;
    user.emailVerificationSecret = secret;
    await user.save();

    // Send OTP to the user via email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Password Reset OTP",
      text: `Your password reset OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    // Respond with success message
    res.status(200).json({
      success: true,
      message: "Password reset OTP sent successfully",
    });

    // Move next() here
    next();
  } catch (error) {
    console.log(error);
    next(
      new ApiError(
        500,
        "Internal Server Error",
        "Failed to send password reset OTP || " + error.message || ""
      )
    );
  }
});

const verifyPasswordResetOTP = asyncHandler(async (req, res, next) => {
  try {
    const { email, otp } = req.body;

    if (!email || !otp) {
      throw new ApiError(
        400,
        "Incomplete data",
        "Email, OTP, and are required"
      );
    }

    // Find the user
    const user = await userModel.User.findOne({ email: email });
    if (!user) {
      throw new ApiError(404, "User Not Found", "User not found");
    }

    // Verify the OTP
    if (user.passwordResetOTP !== otp) {
      throw new ApiError(400, "Invalid OTP", "Invalid OTP for password reset");
    }
  } catch (error) {
    next(new ApiError(500, "Internal Server Error", error.message));
  }
});

module.exports = { sendPasswordResetOTP, verifyPasswordResetOTP };
