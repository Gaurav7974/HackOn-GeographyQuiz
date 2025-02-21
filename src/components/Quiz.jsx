import React, { useState, useEffect } from "react";
import Question from "./Question";
import AnswerOptions from "./AnswerOptions";

function Quiz() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Utility function: Fisher-Yates shuffle
  function shuffleArray(array) {
    const arr = array.slice();
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=1&category=22&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        // Format each question: shuffle the correct and incorrect answers
        const formattedQuestions = data.results.map((question) => {
          const answerOptions = shuffleArray([
            ...question.incorrect_answers,
            question.correct_answer,
          ]);
          return {
            ...question,
            answerOptions,
          };
        });
        setQuestions(formattedQuestions);
        setLoading(false);
      })
      .catch((error) => {
        console.error("Error fetching questions:", error);
        setLoading(false);
      });
  }, []);

  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setShowResult(true);
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  if (loading) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>
    );
  }

  if (currentQuestionIndex >= questions.length) {
    return (
      <div style={{ textAlign: "center", padding: "20px" }}>
        <h2>Quiz Completed!</h2>
        <p>
          Your score: {score} / {questions.length}
        </p>
      </div>
    );
  }

  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Geography Quiz</h1>
      <Question question={currentQuestion.question} />
      <AnswerOptions
        options={currentQuestion.answerOptions}
        correctAnswer={currentQuestion.correct_answer}
        selectedAnswer={selectedAnswer}
        onAnswerClick={handleAnswerClick}
      />
      {showResult && (
        <div>
          {selectedAnswer === currentQuestion.correct_answer ? (
            <p style={{ color: "green", fontSize: "18px" }}>Correct!</p>
          ) : (
            <p style={{ color: "red", fontSize: "18px" }}>
              Incorrect! The correct answer is{" "}
              <span
                dangerouslySetInnerHTML={{
                  __html: currentQuestion.correct_answer,
                }}
              />
            </p>
          )}
          <button
            onClick={handleNextQuestion}
            style={{
              padding: "10px 20px",
              fontSize: "16px",
              marginTop: "10px",
            }}
          >
            Next Question
          </button>
        </div>
      )}
      <p>Score: {score}</p>
    </div>
  );
}

export default Quiz;
