import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function MultiplayerPage() {
  const [name, setName] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const navigate = useNavigate();

  const startQuiz = () => {
    if (!name.trim()) {
      alert("Please enter your name.");
      return;
    }
    if (!difficulty) {
      alert("Please select a difficulty level.");
      return;
    }

    let numQuestions = difficulty === "easy" ? 5 : difficulty === "medium" ? 10 : 20;
    navigate("/multi-quiz", { state: { playerName: name, difficulty, numQuestions } });
  };

  return (
    <div
      style={{
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        backgroundColor: "#282c34",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "36px" }}>Multiplayer Quiz</h1>
      <div
        style={{
          padding: "20px",
          borderRadius: "10px",
          background: "white",
          color: "black",
          textAlign: "center",
          boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
        }}
      >
        <h2>Enter Your Name</h2>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter your name"
          style={{
            padding: "10px",
            fontSize: "18px",
            borderRadius: "5px",
            border: "1px solid #ccc",
            width: "250px",
            textAlign: "center",
          }}
        />

        <h2>Select Difficulty</h2>
        <div style={{ display: "flex", justifyContent: "center", gap: "15px", marginTop: "10px" }}>
          {["easy", "medium", "hard"].map((level) => (
            <button
              key={level}
              onClick={() => setDifficulty(level)}
              style={{
                padding: "10px 20px",
                fontSize: "18px",
                backgroundColor: difficulty === level ? "#28a745" : "#ccc",
                color: "white",
                border: "none",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              {level.charAt(0).toUpperCase() + level.slice(1)}
            </button>
          ))}
        </div>

        <button
          onClick={startQuiz}
          style={{
            marginTop: "20px",
            padding: "10px 20px",
            fontSize: "18px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
          }}
        >
          Start Quiz
        </button>
      </div>
    </div>
  );
}

export default MultiplayerPage;
