const mongoose = require("mongoose");

const userScoreSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    score: { type: Number, required: true },
  },
  { timestamps: true } // ✅ This will automatically add "createdAt" and "updatedAt"
);

const UserScore = mongoose.model("UserScore", userScoreSchema);

module.exports = UserScore;
