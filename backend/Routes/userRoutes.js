const express = require("express");
const router = express.Router();
const UserScore = require("../models/UserScore");

// ✅ Save user score
router.post("/submit-score", async (req, res) => {
  try {
    const { name, score } = req.body;

    if (!name || score === undefined) {
      return res.status(400).json({ message: "Name and score are required." });
    }

    const newUserScore = new UserScore({ name, score });
    await newUserScore.save();

    res.status(201).json({ message: "Score submitted successfully!" });
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

// ✅ Fetch top scores sorted by most recent
router.get("/top-scores", async (req, res) => {
  try {
    const scores = await UserScore.find().sort({ createdAt: -1 }).limit(10); // 🔥 Sort by recent submissions
    res.json(scores);
  } catch (error) {
    res.status(500).json({ message: "Server error", error });
  }
});

module.exports = router;
