const mongoose = require("mongoose");

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
  password: {
    type: String,
    required: true,
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
    type: String, // Assuming the profile picture is stored as a URL
    default: "default-profile-picture.jpg", // Default picture if the user doesn't upload one
  },

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

const User = mongoose.model("User", userSchema);

module.exports = User;
