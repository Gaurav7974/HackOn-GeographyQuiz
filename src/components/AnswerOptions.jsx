import React from "react";

function AnswerOptions({
  options,
  correctAnswer,
  selectedAnswer,
  onAnswerClick,
}) {
  return (
    <div>
      {options.map((option, index) => (
        <button
          key={index}
          onClick={() => onAnswerClick(option)}
          disabled={selectedAnswer !== null}
          style={{
            margin: "10px",
            padding: "10px 20px",
            fontSize: "16px",
            cursor: "pointer",
            backgroundColor: selectedAnswer
              ? option === correctAnswer
                ? "green"
                : option === selectedAnswer
                ? "red"
                : ""
              : "",
            color: selectedAnswer ? "white" : "black",
          }}
          dangerouslySetInnerHTML={{ __html: option }}
        />
      ))}
    </div>
  );
}

export default AnswerOptions;
