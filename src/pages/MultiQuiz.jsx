import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function MultiQuiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const playerName = location.state?.playerName || "Player";
  const difficulty = location.state?.difficulty || "easy";
  const numQuestions = location.state?.numQuestions || 5;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(
          `https://opentdb.com/api.php?amount=${numQuestions}&difficulty=${difficulty}&type=multiple`
        );
        const data = await response.json();
        if (data.response_code === 0) {
          setQuestions(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, [numQuestions, difficulty]);

  const handleAnswerClick = (answer) => {
    setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });

    if (answer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }

    if (currentQuestion + 1 < questions.length) {
      setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1000);
    } else {
      setTimeout(() => setGameOver(true), 1000);
    }
  };

  const restartGame = () => {
    navigate("/multi");
  };

  return (
    <div style={{ textAlign: "center", padding: "20px", backgroundColor: "#f4f4f4", minHeight: "100vh" }}>
      {!gameOver ? (
        questions.length > 0 ? (
          <>
            <h2 style={{ fontSize: "28px", color: "#333" }}>Welcome, {playerName}!</h2>
            <h3>Difficulty: {difficulty.toUpperCase()}</h3>
            <div
              style={{
                maxWidth: "800px",
                margin: "20px auto",
                padding: "20px",
                background: "white",
                borderRadius: "10px",
                boxShadow: "0px 4px 10px rgba(0, 0, 0, 0.2)",
              }}
            >
              <h3 dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "20px" }}>
                {[
                  ...questions[currentQuestion].incorrect_answers,
                  questions[currentQuestion].correct_answer,
                ]
                  .sort(() => Math.random() - 0.5)
                  .map((option, index) => (
                    <button
                      key={index}
                      onClick={() => handleAnswerClick(option)}
                      disabled={selectedAnswers[currentQuestion] !== undefined}
                      style={{
                        padding: "10px",
                        fontSize: "18px",
                        cursor: "pointer",
                        backgroundColor: selectedAnswers[currentQuestion]
                          ? option === questions[currentQuestion].correct_answer
                            ? "green"
                            : option === selectedAnswers[currentQuestion]
                            ? "red"
                            : "white"
                          : "white",
                        color: selectedAnswers[currentQuestion] ? "white" : "black",
                        border: "1px solid #ccc",
                        borderRadius: "5px",
                      }}
                      dangerouslySetInnerHTML={{ __html: option }}
                    />
                  ))}
              </div>
            </div>
          </>
        ) : (
          <p>Loading questions...</p>
        )
      ) : (
        <div>
          <h2>Quiz Over!</h2>
          <p>
            <strong>{playerName}</strong>, your Score: {score} / {numQuestions}
          </p>
          <button
            onClick={restartGame}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "green",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Play Again
          </button>
          <button
            onClick={() => navigate("/")}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "gray",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
            }}
          >
            Home
          </button>
        </div>
      )}
    </div>
  );
}

export default MultiQuiz;
