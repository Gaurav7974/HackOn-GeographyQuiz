
// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function MultiQuiz() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const playerName = location.state?.playerName || "Player";
//   const difficulty = location.state?.difficulty || "easy";
//   const numQuestions = location.state?.numQuestions || 5;

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [scores, setScores] = useState([]); // Leaderboard data

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           `https://opentdb.com/api.php?amount=${numQuestions}&difficulty=${difficulty}&type=multiple`
//         );
//         const data = await response.json();
//         if (data.response_code === 0) {
//           setQuestions(data.results);
//         }
//       } catch (error) {
//         console.error("Failed to fetch questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, [numQuestions, difficulty]);

//   const handleAnswerClick = (answer) => {
//     setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });

//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     if (currentQuestion + 1 < questions.length) {
//       setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1000);
//     } else {
//       setTimeout(() => {
//         setGameOver(true);
//         submitScore();
//       }, 1000);
//     }
//   };

//   const submitScore = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/submit-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: playerName, score }),
//       });

//       const data = await response.json();
//       console.log("Score submitted:", data);

//       fetchScores(); // Fetch leaderboard after submitting score
//     } catch (error) {
//       console.error("Failed to submit score:", error);
//     }
//   };

//   const fetchScores = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/get-scores");
//       const data = await response.json();
//       setScores(data);
//     } catch (error) {
//       console.error("Failed to fetch scores:", error);
//     }
//   };

//   useEffect(() => {
//     if (gameOver) {
//       fetchScores();
//     }
//   }, [gameOver]);

//   const restartGame = () => {
//     navigate("/multi");
//   };

//   return (
//     <div
//       style={{
//         width: "100vw",
//         minHeight: "100vh",
//         background: "#f4f4f4",
//         padding: "30px",
//         boxSizing: "border-box",
//       }}
//     >
//       {!gameOver ? (
//         questions.length > 0 ? (
//           <div style={{ maxWidth: "900px", margin: "0 auto" }}>
//             <h2 style={{ fontSize: "32px", textAlign: "center", color: "#333" }}>
//               Welcome, {playerName}!
//             </h2>
//             <h3 style={{ textAlign: "center", marginBottom: "20px" }}>
//               Difficulty: {difficulty.toUpperCase()}
//             </h3>
//             <div
//               style={{
//                 background: "white",
//                 padding: "30px",
//                 borderRadius: "12px",
//                 boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
//               }}
//             >
//               <h3
//                 style={{
//                   fontSize: "24px",
//                   marginBottom: "20px",
//                   color: "#007bff",
//                 }}
//                 dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }}
//               />
//               <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//                 {[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]
//                   .sort(() => Math.random() - 0.5)
//                   .map((option, index) => (
//                     <button
//                       key={index}
//                       onClick={() => handleAnswerClick(option)}
//                       disabled={selectedAnswers[currentQuestion] !== undefined}
//                       style={{
//                         padding: "12px",
//                         fontSize: "18px",
//                         borderRadius: "8px",
//                         border: "1px solid #ddd",
//                         cursor: "pointer",
//                         transition: "background-color 0.3s",
//                         backgroundColor: selectedAnswers[currentQuestion]
//                           ? option === questions[currentQuestion].correct_answer
//                             ? "green"
//                             : option === selectedAnswers[currentQuestion]
//                             ? "red"
//                             : "#fff"
//                           : "#fff",
//                         color: selectedAnswers[currentQuestion] ? "#fff" : "#333",
//                       }}
//                       dangerouslySetInnerHTML={{ __html: option }}
//                     />
//                   ))}
//               </div>
//             </div>
//           </div>
//         ) : (
//           <p style={{ fontSize: "24px", textAlign: "center" }}>Loading questions...</p>
//         )
//       ) : (
//         <div style={{ maxWidth: "900px", margin: "0 auto", textAlign: "center" }}>
//           <h2 style={{ fontSize: "32px", color: "#333" }}>Quiz Over!</h2>
//           <p style={{ fontSize: "24px", marginBottom: "30px" }}>
//             <strong>{playerName}</strong>, your Score: {score} / {numQuestions}
//           </p>

//           {/* Leaderboard */}
//           <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>Leaderboard</h3>
//           <table
//             style={{
//               width: "100%",
//               maxWidth: "600px",
//               margin: "0 auto 30px",
//               borderCollapse: "collapse",
//               boxShadow: "0 4px 15px rgba(0,0,0,0.15)",
//             }}
//           >
//             <thead>
//               <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
//                 <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
//                 <th style={{ padding: "12px", border: "1px solid #ddd" }}>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {scores.length > 0 ? (
//                 scores.map((user, index) => (
//                   <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
//                     <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
//                       {user.name}
//                     </td>
//                     <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>
//                       {user.score}
//                     </td>
//                   </tr>
//                 ))
//               ) : (
//                 <tr>
//                   <td colSpan="2" style={{ padding: "12px", textAlign: "center" }}>
//                     No scores available
//                   </td>
//                 </tr>
//               )}
//             </tbody>
//           </table>

//           <div>
//             <button
//               onClick={restartGame}
//               style={{
//                 marginRight: "10px",
//                 padding: "12px 24px",
//                 fontSize: "18px",
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer",
//                 backgroundColor: "green",
//                 color: "#fff",
//                 transition: "background-color 0.3s",
//               }}
//             >
//               Play Again
//             </button>
//             <button
//               onClick={() => navigate("/")}
//               style={{
//                 padding: "12px 24px",
//                 fontSize: "18px",
//                 borderRadius: "8px",
//                 border: "none",
//                 cursor: "pointer",
//                 backgroundColor: "gray",
//                 color: "#fff",
//                 transition: "background-color 0.3s",
//               }}
//             >
//               Home
//             </button>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MultiQuiz;






// import React, { useState, useEffect } from "react";
// import { useLocation, useNavigate } from "react-router-dom";

// function MultiQuiz() {
//   const location = useLocation();
//   const navigate = useNavigate();
//   const playerName = location.state?.playerName || "Player";
//   const difficulty = location.state?.difficulty || "easy";
//   const numQuestions = location.state?.numQuestions || 5;

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswer, setSelectedAnswer] = useState(null);
//   const [showAnswer, setShowAnswer] = useState(false);
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);
//   const [scores, setScores] = useState([]);
//   const [shuffledOptions, setShuffledOptions] = useState([]);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(
//           `https://opentdb.com/api.php?amount=${numQuestions}&difficulty=${difficulty}&type=multiple`
//         );
//         const data = await response.json();
//         if (data.response_code === 0) {
//           setQuestions(data.results);
//         }
//       } catch (error) {
//         console.error("Failed to fetch questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, [numQuestions, difficulty]);

//   useEffect(() => {
//     if (questions.length > 0) {
//       const options = [
//         ...questions[currentQuestion].incorrect_answers,
//         questions[currentQuestion].correct_answer,
//       ];
//       setShuffledOptions(options); // No shuffling after submission
//     }
//   }, [questions, currentQuestion]);

//   const handleAnswerClick = (answer) => {
//     if (!showAnswer) {
//       setSelectedAnswer(answer);
//     }
//   };

//   const handleSubmit = () => {
//     if (!selectedAnswer) return;
//     setShowAnswer(true);
//     if (selectedAnswer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }
//   };

//   const handleNextQuestion = () => {
//     if (currentQuestion + 1 < questions.length) {
//       setCurrentQuestion(currentQuestion + 1);
//       setSelectedAnswer(null);
//       setShowAnswer(false);
//     } else {
//       setGameOver(true);
//       submitScore();
//     }
//   };

//   const submitScore = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/submit-score", {
//         method: "POST",
//         headers: { "Content-Type": "application/json" },
//         body: JSON.stringify({ name: playerName, score }),
//       });

//       await response.json();
//       fetchScores();
//     } catch (error) {
//       console.error("Failed to submit score:", error);
//     }
//   };

//   const fetchScores = async () => {
//     try {
//       const response = await fetch("http://localhost:5000/api/users/get-scores");
//       const data = await response.json();
//       setScores(data);
//     } catch (error) {
//       console.error("Failed to fetch scores:", error);
//     }
//   };

//   useEffect(() => {
//     if (gameOver) {
//       fetchScores();
//     }
//   }, [gameOver]);

//   return (
//     <div style={{ width: "100vw", minHeight: "100vh", background: "#f4f4f4", padding: "30px", textAlign: "center" }}>
//       {!gameOver ? (
//         questions.length > 0 ? (
//           <div style={{ maxWidth: "900px", margin: "0 auto" }}>
//             <h2 style={{ fontSize: "32px", color: "#333" }}>Welcome, {playerName}!</h2>
//             <h3 style={{ marginBottom: "20px" }}>Difficulty: {difficulty.toUpperCase()}</h3>
//             <div style={{ background: "white", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(0,0,0,0.15)" }}>
//               <h3 style={{ fontSize: "24px", marginBottom: "20px", color: "#007bff" }} dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
//               <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
//                 {shuffledOptions.map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerClick(option)}
//                     disabled={showAnswer}
//                     style={{
//                       padding: "12px",
//                       fontSize: "18px",
//                       borderRadius: "8px",
//                       border: "1px solid #ddd",
//                       cursor: "pointer",
//                       transition: "background-color 0.3s",
//                       backgroundColor: showAnswer
//                         ? option === questions[currentQuestion].correct_answer
//                           ? "green"
//                           : option === selectedAnswer
//                           ? "red"
//                           : "#fff"
//                         : selectedAnswer === option
//                         ? "#d3d3d3"
//                         : "#fff",
//                       color: showAnswer ? "#fff" : "#333",
//                     }}
//                     dangerouslySetInnerHTML={{ __html: option }}
//                   />
//                 ))}
//               </div>

//               {selectedAnswer && !showAnswer && (
//                 <button onClick={handleSubmit} style={{ marginTop: "15px", padding: "12px 24px", fontSize: "18px", borderRadius: "8px", cursor: "pointer", backgroundColor: "#007bff", color: "#fff" }}>
//                   Submit
//                 </button>
//               )}

//               {showAnswer && (
//                 <button onClick={handleNextQuestion} style={{ marginTop: "15px", padding: "12px 24px", fontSize: "18px", borderRadius: "8px", cursor: "pointer", backgroundColor: "#28a745", color: "#fff" }}>
//                   Next Question
//                 </button>
//               )}
//             </div>
//           </div>
//         ) : (
//           <p style={{ fontSize: "24px" }}>Loading questions...</p>
//         )
//       ) : (
//         <div style={{ maxWidth: "900px", margin: "0 auto" }}>
//           <h2 style={{ fontSize: "32px", color: "#333" }}>Game Over!</h2>
//           <p style={{ fontSize: "24px", marginBottom: "30px" }}><strong>{playerName}</strong>, your Score: {score} / {numQuestions}</p>

//           <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>Leaderboard</h3>
//           <table style={{ width: "100%", maxWidth: "600px", margin: "0 auto 30px", borderCollapse: "collapse", boxShadow: "0 4px 15px rgba(0,0,0,0.15)" }}>
//             <thead>
//               <tr style={{ backgroundColor: "#007bff", color: "#fff" }}>
//                 <th style={{ padding: "12px", border: "1px solid #ddd" }}>Name</th>
//                 <th style={{ padding: "12px", border: "1px solid #ddd" }}>Score</th>
//               </tr>
//             </thead>
//             <tbody>
//               {scores.length > 0 ? scores.map((user, index) => (
//                 <tr key={index} style={{ borderBottom: "1px solid #ddd" }}>
//                   <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>{user.name}</td>
//                   <td style={{ padding: "12px", border: "1px solid #ddd", textAlign: "center" }}>{user.score}</td>
//                 </tr>
//               )) : (
//                 <tr><td colSpan="2" style={{ padding: "12px", textAlign: "center" }}>No scores available</td></tr>
//               )}
//             </tbody>
//           </table>

//           <button onClick={() => navigate("/multi")} style={{ padding: "12px 24px", fontSize: "18px", borderRadius: "8px", cursor: "pointer", backgroundColor: "green", color: "#fff" }}>Play Again</button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default MultiQuiz;





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
  const [scores, setScores] = useState([]);
  const [shuffledOptions, setShuffledOptions] = useState([]);

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

  useEffect(() => {
    if (questions.length > 0) {
      const options = [
        ...questions[currentQuestion].incorrect_answers,
        questions[currentQuestion].correct_answer,
      ];
      setShuffledOptions(options);
    }
  }, [questions, currentQuestion]);

  const handleAnswerClick = (answer) => {
    if (!showAnswer) {
      setSelectedAnswer(answer);
    }
  };

  const handleSubmit = () => {
    if (!selectedAnswer) return;
    setShowAnswer(true);
    if (selectedAnswer === questions[currentQuestion].correct_answer) {
      setScore(score + 1);
    }
  };

  const handleNextQuestion = () => {
    if (currentQuestion + 1 < questions.length) {
      setCurrentQuestion(currentQuestion + 1);
      setSelectedAnswer(null);
      setShowAnswer(false);
    } else {
      setGameOver(true);
      submitScore();
    }
  };

  const submitScore = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/submit-score", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: playerName, score }),
      });

      await response.json();
      fetchScores();
    } catch (error) {
      console.error("Failed to submit score:", error);
    }
  };

  const fetchScores = async () => {
    try {
      const response = await fetch("http://localhost:5000/api/users/get-scores");
      const data = await response.json();
      setScores(data);
    } catch (error) {
      console.error("Failed to fetch scores:", error);
    }
  };

  useEffect(() => {
    if (gameOver) {
      fetchScores();
    }
  }, [gameOver]);

  return (
    <div style={{ width: "100vw", minHeight: "100vh", background: "#121212", padding: "30px", textAlign: "center", color: "#fff" }}>
      {!gameOver ? (
        questions.length > 0 ? (
          <div style={{ maxWidth: "900px", margin: "0 auto" }}>
            <h2 style={{ fontSize: "32px", color: "#fff" }}>Welcome, {playerName}!</h2>
            <h3 style={{ marginBottom: "20px", color: "#bbb" }}>Difficulty: {difficulty.toUpperCase()}</h3>
            <div style={{ background: "#1e1e1e", padding: "30px", borderRadius: "12px", boxShadow: "0 4px 15px rgba(255,255,255,0.1)" }}>
              <h3 style={{ fontSize: "24px", marginBottom: "20px", color: "#00bcd4" }} dangerouslySetInnerHTML={{ __html: questions[currentQuestion].question }} />
              <div style={{ display: "flex", flexDirection: "column", gap: "12px" }}>
                {shuffledOptions.map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    disabled={showAnswer}
                    style={{
                      padding: "12px",
                      fontSize: "18px",
                      borderRadius: "8px",
                      border: "1px solid #444",
                      cursor: "pointer",
                      transition: "background-color 0.3s",
                      backgroundColor: showAnswer
                        ? option === questions[currentQuestion].correct_answer
                          ? "green"
                          : option === selectedAnswer
                          ? "red"
                          : "#333"
                        : selectedAnswer === option
                        ? "#555"
                        : "#222",
                      color: "#fff",
                    }}
                    dangerouslySetInnerHTML={{ __html: option }}
                  />
                ))}
              </div>

              {selectedAnswer && !showAnswer && (
                <button onClick={handleSubmit} style={{ marginTop: "15px", padding: "12px 24px", fontSize: "18px", borderRadius: "8px", cursor: "pointer", backgroundColor: "#00bcd4", color: "#fff" }}>
                  Submit
                </button>
              )}

              {showAnswer && (
                <button onClick={handleNextQuestion} style={{ marginTop: "15px", padding: "12px 24px", fontSize: "18px", borderRadius: "8px", cursor: "pointer", backgroundColor: "#4caf50", color: "#fff" }}>
                  Next Question
                </button>
              )}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: "24px" }}>Loading questions...</p>
        )
      ) : (
        <div style={{ maxWidth: "900px", margin: "0 auto" }}>
          <h2 style={{ fontSize: "32px", color: "#fff" }}>Game Over!</h2>
          <p style={{ fontSize: "24px", marginBottom: "30px" }}><strong>{playerName}</strong>, your Score: {score} / {numQuestions}</p>

          <h3 style={{ fontSize: "28px", marginBottom: "20px" }}>Leaderboard</h3>
          <table style={{ width: "100%", maxWidth: "600px", margin: "0 auto 30px", borderCollapse: "collapse", boxShadow: "0 4px 15px rgba(255,255,255,0.1)", color: "#fff" }}>
            <thead>
              <tr style={{ backgroundColor: "#00bcd4", color: "#fff" }}>
                <th style={{ padding: "12px", border: "1px solid #555" }}>Name</th>
                <th style={{ padding: "12px", border: "1px solid #555" }}>Score</th>
              </tr>
            </thead>
            <tbody>
              {scores.length > 0 ? scores.map((user, index) => (
                <tr key={index} style={{ borderBottom: "1px solid #555" }}>
                  <td style={{ padding: "12px", border: "1px solid #555", textAlign: "center" }}>{user.name}</td>
                  <td style={{ padding: "12px", border: "1px solid #555", textAlign: "center" }}>{user.score}</td>
                </tr>
              )) : (
                <tr><td colSpan="2" style={{ padding: "12px", textAlign: "center" }}>No scores available</td></tr>
              )}
            </tbody>
          </table>

          <button onClick={() => navigate("/multi")} style={{ padding: "12px 24px", fontSize: "18px", borderRadius: "8px", cursor: "pointer", backgroundColor: "#4caf50", color: "#fff" }}>Play Again</button>
        </div>
      )}
    </div>
  );
}

export default MultiQuiz;
