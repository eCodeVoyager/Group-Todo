const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");
const speakeasy = require("speakeasy");
const transporter = require("../configs/nodemailer.config");
const userModel = require("../models/index");

const generateOTP = () => {
  const secret = speakeasy.generateSecret();
  const otp = speakeasy.totp({
    secret: secret.base32,
    encoding: "base32",
  });
  return { otp, secret };
};

const OTPMailer = async (req, res, next) => {
  try {
    const { email } = req.body;

    // Generate OTP and get the secret
    const { otp, secret } = generateOTP();

    // Store the secret in the user model or wherever you need it
    // For example, you can store it in the database along with the user details
    // Assuming you have a User model with an emailVerificationSecret field
    // You should adapt this to your actual model structure
    const user = await userModel.User.findOneAndUpdate(
      { email },
      { $set: { emailVerificationSecret: secret.base32 } }
    );

    // Send OTP to the user via email
    const mailOptions = {
      from: process.env.SENDER_EMAIL,
      to: email,
      subject: "Email Verification OTP",
      text: `Your OTP is: ${otp}`,
    };

    await transporter.sendMail(mailOptions);

    res.status(200).json({
      success: true,
      message: "OTP sent successfully",
    });
  } catch (error) {
    console.error("Error in OTPMailer middleware:", error);
    next(new ApiError(500, "Internal Server Error", "Failed to send OTP"));
  }
};

module.exports = { OTPMailer, generateOTP };
