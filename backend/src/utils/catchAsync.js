// Wrapper to catch async errors in controllers
const catchAsync = (fn) => (req, res, next) => {
  // Run the async function and catch any rejection
  Promise.resolve(fn(req, res, next)).catch(next);
};

// Export wrapper
module.exports = catchAsync;