const mongoose = require("mongoose");

// Create Schema
const userSchema = new mongoose.Schema(
  {
    name: {
      type: "string",
      required: true,
    },
    email: {
      type: "string",
      required: true,
    },
    age: {
      type: "number",
    },
    deletedAt: {
      type: Date,
      default: null,
    }, // Soft delete field
  },
  { timestamps: true }
);

userSchema.index({ email: 1 }, { unique: true });
const userHistorySchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  versionNumber: { type: Number, required: true },
  data: { type: Object, required: true }, // Store a snapshot of user data
  modifiedAt: { type: Date, default: Date.now },
});

const UserHistory = mongoose.model("UserHistory", userHistorySchema);

// Create Model
const User = mongoose.model("User", userSchema);

module.exports = { User, UserHistory };
