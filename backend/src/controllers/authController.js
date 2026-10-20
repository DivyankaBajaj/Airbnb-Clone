// Import models and utilities
const User = require("../models/User");
const generateToken = require("../utils/generateToken");
const catchAsync = require("../utils/catchAsync");

// @desc    Register new user
// @route   POST /api/auth/signup
// @access  Public
exports.signup = catchAsync(async (req, res) => {
  // Destructure body
  const { name, email, password, role } = req.body;

  // Check if email already exists
  const existing = await User.findOne({ email });
  if (existing) {
    return res.status(400).json({ message: "Email already registered" });
  }

  // Create user
  const user = await User.create({
    name,
    email,
    password,
    role: role || "guest",
  });

  // Generate JWT
  const token = generateToken(user._id, user.role);

  // Send response
  res.status(201).json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
exports.login = catchAsync(async (req, res) => {
  // Destructure body
  const { email, password } = req.body;

  // Find user
  const user = await User.findOne({ email });

  // Check user exists and password matches
  if (!user || !(await user.comparePassword(password))) {
    return res.status(401).json({ message: "Invalid credentials" });
  }

  // Generate JWT
  const token = generateToken(user._id, user.role);

  // Send response
  res.json({
    _id: user._id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  });
});

// @desc    Get current user
// @route   GET /api/auth/me
// @access  Private
exports.getMe = catchAsync(async (req, res) => {
  // req.user set by protect middleware
  res.json(req.user);
});