// Import mongoose
const mongoose = require("mongoose");
// Import bcryptjs for password hashing
const bcrypt = require("bcryptjs");

// Define User schema
const userSchema = new mongoose.Schema(
  {
    // User's full name
    name: { type: String, required: true, trim: true },
    // User's email (unique)
    email: { type: String, required: true, unique: true, lowercase: true },
    // Hashed password
    password: { type: String, required: true, minlength: 6 },
    // Role determines access level
    role: { type: String, enum: ["guest", "host"], default: "guest" },
    // Optional profile picture
    avatar: { type: String, default: "" },
  },
  { timestamps: true } // adds createdAt and updatedAt
);

// Pre-save hook to hash password before saving
userSchema.pre("save", async function (next) {
  // If password wasn't modified, skip
  if (!this.isModified("password")) return next();
  // Generate salt
  const salt = await bcrypt.genSalt(10);
  // Hash password
  this.password = await bcrypt.hash(this.password, salt);
  // Continue
  next();
});

// Method to compare plain password with hashed password
userSchema.methods.comparePassword = function (plainPassword) {
  return bcrypt.compare(plainPassword, this.password);
};

// Export model
module.exports = mongoose.model("User", userSchema);