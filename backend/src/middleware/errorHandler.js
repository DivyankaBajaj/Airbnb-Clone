// Global error handler middleware
const errorHandler = (err, req, res, next) => {
  // Log error for debugging
  console.error(err.stack);

  // Determine status code
  const status = err.status || 500;

  // Send JSON response
  res.status(status).json({
    message: err.message || "Internal Server Error",
  });
};

// Export middleware
module.exports = errorHandler;