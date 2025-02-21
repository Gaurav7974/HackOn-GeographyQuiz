const mongoose = require("mongoose");

const UserScoreSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    score: {
      type: Number,
      required: true,
    },
    submittedAt: {
      type: Date,
      default: Date.now, // Stores submission time
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model("UserScore", UserScoreSchema);
