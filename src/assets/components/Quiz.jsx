import React, { useState, useEffect } from "react";
import Question from "./Question";
import AnswerOptions from "./AnswerOptions";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);
  const [startQuiz, setStartQuiz] = useState(false);
  const [numQuestions, setNumQuestions] = useState(5);

  useEffect(() => {
    if (!startQuiz) return;

    const fetchQuestions = async () => {
      try {
        const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=22&type=multiple`);
        const data = await response.json();
        if (data.response_code === 0) {
          setQuestions(data.results);
        }
      } catch (error) {
        console.error("Failed to fetch questions:", error);
      }
    };

    fetchQuestions();
  }, [startQuiz, numQuestions]);

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
    setCurrentQuestion(0);
    setScore(0);
    setSelectedAnswers({});
    setGameOver(false);
    setQuestions([]);
    setStartQuiz(false);
  };

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      {!startQuiz ? (
        <div>
          <label className="mr-2">Number of Questions:</label>
          <input
            type="number"
            value={numQuestions}
            onChange={(e) => setNumQuestions(Number(e.target.value))}
            min="1"
            className="border p-1 rounded"
          />
          <button
            onClick={() => setStartQuiz(true)}
            style={{
              marginLeft: "10px",
              padding: "10px 20px",
              fontSize: "18px",
              cursor: "pointer",
              backgroundColor: "blue",
              color: "white",
              border: "none",
              borderRadius: "5px",
            }}
          >
            Start Quiz
          </button>
        </div>
      ) : !gameOver ? (
        questions.length > 0 ? (
          <>
            <Question question={questions[currentQuestion].question} />
            <AnswerOptions
              options={[
                ...questions[currentQuestion].incorrect_answers,
                questions[currentQuestion].correct_answer,
              ].sort(() => Math.random() - 0.5)}
              correctAnswer={questions[currentQuestion].correct_answer}
              selectedAnswer={selectedAnswers[currentQuestion] || null}
              onAnswerClick={handleAnswerClick}
              showResults={false}
            />
          </>
        ) : (
          <p>Loading questions...</p>
        )
      ) : (
        <div>
          <h2>Quiz Over!</h2>
          <p>Your Score: {score} / {questions.length}</p>
          <h3>Review Your Answers:</h3>
          {questions.map((q, index) => (
            <div key={index} style={{ marginBottom: "20px", padding: "10px", border: "1px solid #ccc", borderRadius: "5px" }}>
              <Question question={q.question} />
              <AnswerOptions
                options={[...q.incorrect_answers, q.correct_answer].sort(() => Math.random() - 0.5)}
                correctAnswer={q.correct_answer}
                selectedAnswer={selectedAnswers[index] || null}
                showResults={true}
              />
            </div>
          ))}
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
        </div>
      )}
    </div>
  );
}

export default Quiz;
