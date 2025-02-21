



// import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";

// function QuizPage() {
//   const [numQuestions, setNumQuestions] = useState(5);
//   const [difficulty, setDifficulty] = useState("easy");
//   const navigate = useNavigate();

//   // Update image paths as needed. If using public folder, use absolute paths.
//   const difficultyImages = {
//     easy: "/easy.jfif",
//     medium: "/medium.jfif",
//     hard: "/hard.jfif",
//   };

//   return (
//     <div
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         background: "#1a1a1a",
//         color: "white",
//         display: "flex",
//         flexDirection: "column",
//         alignItems: "center",
//         justifyContent: "center",
//         padding: "40px",
//       }}
//     >
//       <h2 style={{ marginBottom: "10px", fontSize: "32px" }}>CHOOSE NUMBER OF QUESTIONS</h2>
//       <input
//         type="number"
//         value={numQuestions}
//         onChange={(e) => setNumQuestions(Number(e.target.value))}
//         min="1"
//         style={{
//           padding: "12px",
//           fontSize: "20px",
//           margin: "10px",
//           borderRadius: "5px",
//           textAlign: "center",
//           border: "1px solid #ccc",
//           width: "150px",
//         }}
//       />

//       <h2 style={{ marginTop: "20px", fontSize: "32px" }}>SELECT YOUR DIFFICULTY</h2>
//       <div style={{ display: "flex", justifyContent: "center", gap: "20px", marginTop: "20px" }}>
//         {["easy", "medium", "hard"].map((level) => (
//           <div
//             key={level}
//             onClick={() => setDifficulty(level)}
//             style={{
//               padding: "20px",
//               border: `2px solid ${difficulty === level ? "#00ff00" : "#fff"}`,
//               borderRadius: "10px",
//               cursor: "pointer",
//               transition: "0.3s",
//               minWidth: "140px",
//               textAlign: "center",
//               background: "#2a2a2a",
//             }}
//           >
//             <img
//               src={difficultyImages[level]}
//               alt={`${level} difficulty`}
//               style={{ width: "80px", height: "80px", marginBottom: "10px", objectFit: "cover", borderRadius: "8px" }}
//             />
//             <h3 style={{ textTransform: "capitalize", margin: 0, fontSize: "20px" }}>{level}</h3>
//           </div>
//         ))}
//       </div>

//       <button
//         onClick={() => navigate("/multi-quiz", { state: { playerName: "Anonymous", difficulty, numQuestions } })}
//         style={{
//           marginTop: "30px",
//           padding: "15px 30px",
//           fontSize: "20px",
//           backgroundColor: "#007bff",
//           color: "white",
//           border: "none",
//           borderRadius: "8px",
//           cursor: "pointer",
//           transition: "0.3s",
//         }}
//         onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
//         onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
//       >
//         Start Quiz
//       </button>
//     </div>
//   );
// }

// export default QuizPage;




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
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showAnswer, setShowAnswer] = useState(false);
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
    setSelectedAnswer(answer);
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowAnswer(true);
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
    setTimeout(() => {
      if (currentQuestion + 1 < questions.length) {
        setCurrentQuestion(currentQuestion + 1);
        setSelectedAnswer(null);
        setShowAnswer(false);
      } else {
        setGameOver(true);
      }
    }, 2000);
  };

  return (
    <div style={{
      width: "100vw",
      minHeight: "100vh",
      background: "#121212",
      color: "white",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      padding: "20px",
    }}>
      {!gameOver ? (
        questions.length > 0 ? (
          <div style={{
            width: "80%",
            maxWidth: "600px",
            background: "#1e1e1e",
            padding: "30px",
            borderRadius: "10px",
            boxShadow: "0px 4px 10px rgba(0,0,0,0.2)",
            textAlign: "center",
          }}>
            <h2 style={{ fontSize: "24px", marginBottom: "20px" }}>Question {currentQuestion + 1}</h2>
            <p style={{ fontSize: "18px" }} dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
            <div style={{ marginTop: "20px", display: "flex", flexDirection: "column", gap: "10px" }}>
              {[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={showAnswer}
                    style={{
                      padding: "12px",
                      fontSize: "16px",
                      borderRadius: "5px",
                      border: "none",
                      cursor: showAnswer ? "default" : "pointer",
                      backgroundColor: showAnswer
                        ? option === questions[currentQuestion].correct_answer
                          ? "green"
                          : "red"
                        : selectedAnswer === option
                        ? "#444"
                        : "#222",
                      color: "white",
                      transition: "0.3s",
                    }}
                    dangerouslySetInnerHTML={{ __html: option }}
                  />
                ))}
            </div>
            {selectedAnswer && !showAnswer && (
              <button
                onClick={handleSubmit}
                style={{
                  marginTop: "20px",
                  padding: "10px 20px",
                  fontSize: "18px",
                  backgroundColor: "#007bff",
                  color: "white",
                  border: "none",
                  borderRadius: "5px",
                  cursor: "pointer",
                  transition: "0.3s",
                }}
              >
                Submit
              </button>
            )}
          </div>
        ) : (
          <p>Loading questions...</p>
        )
      ) : (
        <div style={{ textAlign: "center" }}>
          <h2>Game Over!</h2>
          <p>Your Score: {score} / {numQuestions}</p>
          <button
            onClick={() => navigate("/")}
            style={{
              marginTop: "20px",
              padding: "10px 20px",
              fontSize: "18px",
              backgroundColor: "#007bff",
              color: "white",
              border: "none",
              borderRadius: "5px",
              cursor: "pointer",
              transition: "0.3s",
            }}
          >
            Play Again
          </button>
        </div>
      )}
    </div>
  );
}

export default MultiQuiz;
