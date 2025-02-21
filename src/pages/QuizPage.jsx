import React, { useState } from "react";

function QuizPage() {
  const [numQuestions, setNumQuestions] = useState(5);
  const [difficulty, setDifficulty] = useState("easy");

  return (
    <div
      style={{
        width: "100vw", // ✅ Full width
        minHeight: "100vh", // ✅ Full height
        background: "#1a1a1a",
        color: "white",
        display: "flex", // ✅ Center content
        flexDirection: "column",
        alignItems: "center",
        justifyContent: "center",
        padding: "40px",
      }}
    >
      <h2 style={{ marginBottom: "10px" }}>CHOOSE NUMBER OF QUESTIONS</h2>
      <input
        type="number"
        value={numQuestions}
        onChange={(e) => setNumQuestions(Number(e.target.value))}
        min="1"
        style={{
          padding: "10px",
          fontSize: "18px",
          margin: "10px",
          borderRadius: "5px",
          textAlign: "center",
        }}
      />

      <h2 style={{ marginTop: "20px" }}>SELECT YOUR DIFFICULTY</h2>
      <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
        {["easy", "medium", "hard"].map((level) => (
          <div
            key={level}
            style={{
              padding: "20px",
              border: `2px solid ${difficulty === level ? "#00ff00" : "#fff"}`,
              borderRadius: "10px",
              cursor: "pointer",
              transition: "0.3s",
              minWidth: "120px",
              textAlign: "center",
            }}
            onClick={() => setDifficulty(level)}
            onMouseOver={(e) => (e.target.style.borderColor = "#00ff00")}
            onMouseOut={(e) => (e.target.style.borderColor = difficulty === level ? "#00ff00" : "#fff")}
          >
            <h3 style={{ textTransform: "capitalize", margin: 0 }}>{level}</h3>
          </div>
        ))}
      </div>

      <button
        style={{
          marginTop: "30px",
          padding: "15px 30px",
          fontSize: "20px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          borderRadius: "8px",
          cursor: "pointer",
          transition: "0.3s",
        }}
        onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
        onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
      >
        Start Quiz
      </button>
    </div>
  );
}

export default QuizPage;
