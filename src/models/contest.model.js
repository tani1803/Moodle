const mongoose = require("mongoose");

const contestSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true
    },
    platform: {
      type: String,
      required: true // e.g., 'Codeforces', 'LeetCode'
    },
    link: {
      type: String,
      required: true
    },
    startTime: {
      type: Date,
      required: true
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true
    }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Contest", contestSchema);
