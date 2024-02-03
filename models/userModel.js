const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

//User Schema
const userSchema = new mongoose.Schema({
  // Authentication-related fields
  email: {
    type: String,
    required: true,
    unique: true,
    trim: true,
    lowercase: true,
  },
  email_verified: {
    type: Boolean,
    default: false,
  },
  emailVerificationSecret: {
    type: String,
    default: "",
  },

  password: {
    type: String,
    required: true,
  },
  refresh_token: {
    type: String,
    default: "",
  },

  // Profile-related fields
  name: {
    type: String,
    required: true,
  },

  bio: {
    type: String,
    default: "",
  },
  profilePicture: {
    type: String, //  profile picture is stored as a URL from Cloudinary
    default: "default-profile-picture.jpg", // Default picture if the user doesn't upload one
  },
   //Notes
  notes: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Note",
    },
  ],
  // Timestamps
  created_at: {
    type: Date,
    default: Date.now,
  },
  updated_at: {
    type: Date,
    default: Date.now,
  },
});

//Hashing Password Using bcryptjs
userSchema.pre("save", async function (next) {
  const user = this;
  if (user.isModified("password")) {
    user.password = await bcrypt.hash(user.password, 8);
  }
  next();
});

//Verify Password Using bcryptjs

userSchema.methods.isPasswordCorrect = async function (password) {
  const user = this;
  return await bcrypt.compare(password, user.password);
};

//Generate AccessToken && RefreshToken Using jsonwebtoken
userSchema.methods.generateAccessToken = async function () {
  const user = this;
  return await jwt.sign(
    { _id: user._id, username: user.username },
    process.env.ACCESS_TOKEN_SECRET,
    {
      expiresIn: process.env.ACCESS_TOKEN_EXPIRE,
    }
  );
};

userSchema.methods.generateRefreshToken = async function () {
  const user = this;
  return await jwt.sign({ _id: user._id }, process.env.REFRESH_TOKEN_SECRET, {
    expiresIn: process.env.REFRESH_TOKEN_EXPIRE,
  });
};

module.exports = mongoose.model("User", userSchema); // export the model for use in other files
