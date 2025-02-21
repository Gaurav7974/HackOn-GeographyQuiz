import React from "react";

function Question({ question }) {
  return (
    <div>
      <h2 dangerouslySetInnerHTML={{ __html: question }} />
    </div>
  );
}

export default Question;
