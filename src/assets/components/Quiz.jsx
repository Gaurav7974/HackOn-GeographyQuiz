// import React, { useState, useEffect } from "react";
// import { useLocation } from "react-router-dom";

// function Quiz() {
//   const location = useLocation();
//   const numQuestions = location.state?.numQuestions || 5;

//   const [questions, setQuestions] = useState([]);
//   const [currentQuestion, setCurrentQuestion] = useState(0);
//   const [selectedAnswers, setSelectedAnswers] = useState({});
//   const [score, setScore] = useState(0);
//   const [gameOver, setGameOver] = useState(false);

//   useEffect(() => {
//     const fetchQuestions = async () => {
//       try {
//         const response = await fetch(`https://opentdb.com/api.php?amount=${numQuestions}&category=22&type=multiple`);
//         const data = await response.json();
//         if (data.response_code === 0) {
//           setQuestions(data.results);
//         }
//       } catch (error) {
//         console.error("Failed to fetch questions:", error);
//       }
//     };

//     fetchQuestions();
//   }, [numQuestions]);

//   const handleAnswerClick = (answer) => {
//     setSelectedAnswers({ ...selectedAnswers, [currentQuestion]: answer });

//     if (answer === questions[currentQuestion].correct_answer) {
//       setScore(score + 1);
//     }

//     if (currentQuestion + 1 < questions.length) {
//       setTimeout(() => setCurrentQuestion(currentQuestion + 1), 1000);
//     } else {
//       setTimeout(() => setGameOver(true), 1000);
//     }
//   };

//   return (
//     <div style={{
//       width: "100vw",
//       height: "100vh",
//       backgroundColor: "#1a1a1a",
//       color: "white",
//       display: "flex",
//       justifyContent: "center",
//       alignItems: "center",
//       textAlign: "center",
//       padding: "20px",
//     }}>
//       {!gameOver ? (
//         questions.length > 0 ? (
//           <div style={{
//             width: "100%",
//             maxWidth: "1200px",
//             padding: "40px",
//             borderRadius: "10px",
//             background: "#282c34",
//             textAlign: "center",
//             boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
//           }}>
//             <h2 style={{
//               fontSize: "28px",
//               marginBottom: "20px",
//               color: "#61dafb"
//             }}>
//               Question {currentQuestion + 1} / {questions.length}
//             </h2>

//             <p style={{
//               fontSize: "26px",
//               fontWeight: "bold",
//               marginBottom: "20px",
//               color: "#fff"
//             }}>
//               {questions[currentQuestion].question}
//             </p>

//             <div style={{
//               display: "grid",
//               gridTemplateColumns: "1fr 1fr",
//               gap: "20px",
//               marginTop: "20px",
//               width: "100%",
//             }}>
//               {[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]
//                 .sort(() => Math.random() - 0.5)
//                 .map((option, index) => (
//                   <button
//                     key={index}
//                     onClick={() => handleAnswerClick(option)}
//                     style={{
//                       background: selectedAnswers[currentQuestion] === option
//                         ? (option === questions[currentQuestion].correct_answer ? "green" : "red")
//                         : "#007bff",
//                       padding: "20px",
//                       fontSize: "22px",
//                       fontWeight: "bold",
//                       borderRadius: "8px",
//                       border: "none",
//                       cursor: "pointer",
//                       transition: "0.3s",
//                       color: "white",
//                       width: "100%",
//                     }}
//                   >
//                     {option}
//                   </button>
//                 ))}
//             </div>
//           </div>
//         ) : (
//           <p style={{ fontSize: "24px" }}>Loading questions...</p>
//         )
//       ) : (
//         <div style={{ textAlign: "center" }}>
//           <h2 style={{ fontSize: "30px" }}>Quiz Over!</h2>
//           <p style={{ fontSize: "26px", fontWeight: "bold", color: "#61dafb" }}>
//             Your Score: {score} / {questions.length}
//           </p>
//           <button
//             onClick={() => window.location.reload()}
//             style={{
//               marginTop: "20px",
//               padding: "20px 40px",
//               fontSize: "24px",
//               backgroundColor: "green",
//               color: "white",
//               border: "none",
//               borderRadius: "10px",
//               cursor: "pointer",
//             }}
//           >
//             Play Again
//           </button>
//         </div>
//       )}
//     </div>
//   );
// }

// export default Quiz;




import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

function Quiz() {
  const location = useLocation();
  const navigate = useNavigate();
  const numQuestions = location.state?.numQuestions || 5;

  const [questions, setQuestions] = useState([]);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [selectedAnswers, setSelectedAnswers] = useState({});
  const [score, setScore] = useState(0);
  const [gameOver, setGameOver] = useState(false);

  useEffect(() => {
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
  }, [numQuestions]);

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

  return (
    <div style={{
      width: "100vw",
      height: "100vh",
      backgroundColor: "#1a1a1a",
      color: "white",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      textAlign: "center",
      padding: "20px",
    }}>
      {!gameOver ? (
        questions.length > 0 ? (
          <div style={{
            width: "100%",
            maxWidth: "1200px",
            padding: "40px",
            borderRadius: "10px",
            background: "#282c34",
            textAlign: "center",
            boxShadow: "0px 4px 10px rgba(255, 255, 255, 0.2)",
          }}>
            <h2 style={{ fontSize: "28px", marginBottom: "20px", color: "#61dafb" }}>
              Question {currentQuestion + 1} / {questions.length}
            </h2>

            <p style={{ fontSize: "26px", fontWeight: "bold", marginBottom: "20px" }}>
              {questions[currentQuestion].question}
            </p>

            <div style={{
              display: "grid",
              gridTemplateColumns: "1fr 1fr",
              gap: "20px",
              marginTop: "20px",
              width: "100%",
            }}>
              {[...questions[currentQuestion].incorrect_answers, questions[currentQuestion].correct_answer]
                .sort(() => Math.random() - 0.5)
                .map((option, index) => (
                  <button
                    key={index}
                    onClick={() => handleAnswerClick(option)}
                    style={{
                      background: selectedAnswers[currentQuestion] === option
                        ? (option === questions[currentQuestion].correct_answer ? "green" : "red")
                        : "#007bff",
                      padding: "20px",
                      fontSize: "22px",
                      fontWeight: "bold",
                      borderRadius: "8px",
                      border: "none",
                      cursor: "pointer",
                      transition: "0.3s",
                      color: "white",
                      width: "100%",
                    }}
                  >
                    {option}
                  </button>
                ))}
            </div>
          </div>
        ) : (
          <p style={{ fontSize: "24px" }}>Loading questions...</p>
        )
      ) : (
        <div style={{ width: "100%", maxWidth: "800px", textAlign: "center" }}>
          <h2 style={{ fontSize: "30px" }}>Quiz Over!</h2>
          <p style={{ fontSize: "26px", fontWeight: "bold", color: "#61dafb" }}>
            Your Score: {score} / {questions.length}
          </p>

          <h3 style={{ marginTop: "20px", fontSize: "24px", color: "#ffcc00" }}>Review Your Answers:</h3>
          <div style={{ maxHeight: "50vh", overflowY: "auto", padding: "10px", borderRadius: "8px", background: "#222" }}>
            {questions.map((q, index) => (
              <div key={index} style={{ 
                marginBottom: "20px", 
                padding: "15px", 
                border: "2px solid #555", 
                borderRadius: "10px",
                backgroundColor: selectedAnswers[index] === q.correct_answer ? "green" : "red",
                color: "white"
              }}>
                <p style={{ fontSize: "20px", fontWeight: "bold" }}>{q.question}</p>
                <p>
                  <strong>Your Answer: </strong>
                  <span style={{ color: selectedAnswers[index] === q.correct_answer ? "#00ff00" : "#ff4444" }}>
                    {selectedAnswers[index] || "Not Answered"}
                  </span>
                </p>
                <p>
                  <strong>Correct Answer: </strong>
                  <span style={{ color: "#00ff00" }}>{q.correct_answer}</span>
                </p>
              </div>
            ))}
          </div>

          <div style={{ marginTop: "20px", display: "flex", justifyContent: "center", gap: "20px" }}>
            <button
              onClick={() => navigate("/")}
              style={{
                padding: "15px 30px",
                fontSize: "20px",
                backgroundColor: "#007bff",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Home
            </button>
            <button
              onClick={() => window.location.reload()}
              style={{
                padding: "15px 30px",
                fontSize: "20px",
                backgroundColor: "green",
                color: "white",
                border: "none",
                borderRadius: "8px",
                cursor: "pointer",
              }}
            >
              Play Again
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Quiz;
