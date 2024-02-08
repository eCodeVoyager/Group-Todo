const crypto = require("crypto");
const transporter = require("../configs/nodemailer.config");
const userModel = require("../models/index");

const generateVerificationToken = async (req, res, next) => {
  const token = crypto.randomBytes(20).toString("hex");
  const email = req.body.email;
  const user = await userModel.User.findOne({ email });
  if (!user) {
    return res.status(404).json({
      success: false,
      message: "User not found",
    });
  }
  user.emailVerificationSecret = token;
  await user.save();

  const verificationLink = `http://localhost:3000/verify-email?token=${token}`;

  const mailOptions = {
    from: process.env.SENDER_EMAIL,
    to: email,
    subject: "Email Verification",
    text: `Click the following link to verify your email: ${verificationLink}`,
  };

  await transporter.sendMail(mailOptions);

  return res.status(200).json({
    success: true,
    message: "Verification link sent successfully",
  });
};

module.exports = { generateVerificationToken };
