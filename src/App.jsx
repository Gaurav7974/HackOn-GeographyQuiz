import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import LandingPage from "./pages/LandingPage";
import QuizPage from "./pages/QuizPage";
import Quiz from "./assets/components/Quiz";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<LandingPage/>} />
        <Route path="/quiz" element={<QuizPage/>} />
        <Route path="/Questions" element={<Quiz/>}/>
      </Routes>
    </Router>
  );
}

export default App;
