// import React from "react";

// function AnswerOptions({
//   options,
//   correctAnswer,
//   selectedAnswer,
//   onAnswerClick,
// }) {
//   return (
//     <div>
//       {options.map((option, index) => (
//         <button
//           key={index}
//           onClick={() => onAnswerClick(option)}
//           disabled={selectedAnswer !== null}
//           style={{
//             margin: "10px",
//             padding: "10px 20px",
//             fontSize: "16px",
//             cursor: "pointer",
//             backgroundColor: selectedAnswer
//               ? option === correctAnswer
//                 ? "green"
//                 : option === selectedAnswer
//                 ? "red"
//                 : ""
//               : "",
//             color: selectedAnswer ? "white" : "black",
//           }}
//           dangerouslySetInnerHTML={{ __html: option }}
//         />
//       ))}
//     </div>
//   );
// }

// export default AnswerOptions;



import React from "react";

function AnswerOptions({ options, correctAnswer, selectedAnswer, onAnswerClick }) {
  return (
    <div>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswerClick(option)}
          disabled={selectedAnswer !== null} // Disable only after selection
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: selectedAnswer === null ? "pointer" : "default",
            backgroundColor:
              selectedAnswer !== null
                ? option === correctAnswer
                  ? "green"
                  : option === selectedAnswer
                  ? "red"
                  : "lightgray"
                : "white",
            color: selectedAnswer !== null ? "white" : "black",
            border: "1px solid black",
          }}
          dangerouslySetInnerHTML={{ __html: option }}
        />
      ))}
    </div>
  );
}

export default AnswerOptions;
