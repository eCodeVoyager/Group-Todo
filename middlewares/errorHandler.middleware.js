// errorHandler.middleware.js
// ApiError && Api Response Send the response object as a JSON
const ApiError = require("../utils/ApiError");
const ApiResponse = require("../utils/ApiResponse");

const errorHandler = (err, req, res, next) => {
  if (err instanceof ApiError) {
    // Handling ApiError
    return res.status(err.statusCode).json({
      success: false,
      message: err.message,
      errors: err.errors,
    });
  }

  if (err instanceof ApiResponse) {
    // Handling ApiResponse
    return res.status(err.statusCode).json({
      success: err.success,
      message: err.message,
      data: err.data,
    });
  }

  // Default error handling for other types of errors
  console.error(err);
  return res.status(500).json({
    success: false,
    message: "Internal Server Error",
  });
};

module.exports = errorHandler;
