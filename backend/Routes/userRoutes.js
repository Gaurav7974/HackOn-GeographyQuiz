// const express = require("express");
// const router = express.Router();
// const UserScore = require("../models/UserScore");

// // ✅ Save user score
// router.post("/submit-score", async (req, res) => {
//   try {
//     const { name, score } = req.body;

//     if (!name || score === undefined) {
//       return res.status(400).json({ message: "Name and score are required." });
//     }

//     const newUserScore = new UserScore({ name, score });
//     await newUserScore.save();

//     res.status(201).json({ message: "Score submitted successfully!" });
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// // ✅ Fetch top scores sorted by most recent
// router.get("/top-scores", async (req, res) => {
//   try {
//     const scores = await UserScore.find().sort({ createdAt: -1 }).limit(10); // 🔥 Sort by recent submissions
//     res.json(scores);
//   } catch (error) {
//     res.status(500).json({ message: "Server error", error });
//   }
// });

// module.exports = router;



const express = require("express");
const UserScore = require("../models/UserScore"); // Import the schema

const router = express.Router();

// ✅ API to Submit Score
router.post("/submit-score", async (req, res) => {
  try {
    const { name, score } = req.body;

    console.log("Received Data:", { name, score }); // 🔥 Debugging log

    if (!name || score === undefined) {
      return res.status(400).json({ message: "Name and score are required." });
    }

    // Save to MongoDB
    const newUserScore = new UserScore({ name, score });
    await newUserScore.save();

    console.log("✅ Score Saved:", newUserScore); // 🔥 Check if it's saved

    res.status(201).json({ message: "Score submitted successfully!" });
  } catch (error) {
    console.error("❌ Error Saving Score:", error);
    res.status(500).json({ message: "Server error", error });
  }
});

// // ✅ API to Get Top Scores (Recent Submissions First)
// router.get("/get-scores", async (req, res) => {
//   try {
//     const scores = await UserScore.find().sort({ submittedAt: -1 }).limit(10); // Sort by latest
//     res.status(200).json(scores);
//   } catch (error) {
//     console.error("❌ Error Fetching Scores:", error);
//     res.status(500).json({ message: "Server error", error });
//   }
// });

router.get("/get-scores", async (req, res) => {
    try {
      const limit = parseInt(req.query.limit) || 10; // Default to 10 scores if not provided
  
      const scores = await UserScore.find().sort({ score: -1 }).limit(limit); // Sort by highest score
      res.status(200).json(scores);
    } catch (error) {
      console.error("❌ Error Fetching Scores:", error);
      res.status(500).json({ message: "Server error", error });
    }
  });
  


  

module.exports = router;
