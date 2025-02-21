import React, { useState, useEffect } from "react";

// Utility function: Fisher-Yates shuffle
function shuffleArray(array) {
  const arr = array.slice(); // Clone the array
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

function App() {
  const [questions, setQuestions] = useState([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showResult, setShowResult] = useState(false);
  const [score, setScore] = useState(0);
  const [loading, setLoading] = useState(true);

  // Fetch questions from Open Trivia Database API on mount
  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10&category=22&type=multiple")
      .then((res) => res.json())
      .then((data) => {
        // Format each question to include a shuffled array of answer options
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

  // Handle answer selection
  const handleAnswerClick = (answer) => {
    setSelectedAnswer(answer);
    if (answer === questions[currentQuestionIndex].correct_answer) {
      setScore((prevScore) => prevScore + 1);
    }
    setShowResult(true);
  };

  // Move to next question
  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
    setSelectedAnswer(null);
    setShowResult(false);
  };

  // Render a loading indicator while fetching data
  if (loading) {
    return <div style={{ textAlign: "center", padding: "20px" }}>Loading...</div>;
  }

  // If all questions have been answered, show the final score
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

  // Current question details
  const currentQuestion = questions[currentQuestionIndex];

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h1>Geography Quiz</h1>
      <div>
        {/* Use dangerouslySetInnerHTML to render HTML entities correctly */}
        <h2 dangerouslySetInnerHTML={{ __html: currentQuestion.question }} />
        <div>
          {currentQuestion.answerOptions.map((answer, index) => (
            <button
              key={index}
              onClick={() => handleAnswerClick(answer)}
              style={{
                margin: "10px",
                padding: "10px 20px",
                fontSize: "16px",
                cursor: "pointer",
                backgroundColor: selectedAnswer
                  ? answer === currentQuestion.correct_answer
                    ? "green"
                    : answer === selectedAnswer
                    ? "red"
                    : ""
                  : "",
                color: selectedAnswer ? "white" : "black",
              }}
              // Render answer text with HTML decoding
              dangerouslySetInnerHTML={{ __html: answer }}
              disabled={!!selectedAnswer}
            />
          ))}
        </div>
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
              style={{ padding: "10px 20px", fontSize: "16px", marginTop: "10px" }}
            >
              Next Question
            </button>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
   
