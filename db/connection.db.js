const mongoose = require("mongoose");
require("dotenv").config(); // Load environment variables from .env file

// Connect to MongoDB using Mongoose
const connectDB = async () => {
  try {
    // Use process.env to retrieve MongoDB URI from environment variables
    const mongoURI = process.env.MONGODB_URI;

    // Connect to MongoDB
    await mongoose.connect(mongoURI);

    console.log("MongoDB Connected Successfully");
  } catch (error) {
    console.error("MongoDB Connection Failed:", error.message);

    // Exit the process if the connection fails
    process.exit(1);
  }
};

// Handle process termination to close the MongoDB connection
process.on("SIGINT", async () => {
  try {
    // Close the MongoDB connection before exiting the process
    await mongoose.connection.close();
    console.log("MongoDB connection closed due to app termination");
    process.exit(0);
  } catch (error) {
    console.error("Error closing MongoDB connection:", error.message);
    process.exit(1);
  }
});

module.exports = connectDB;
