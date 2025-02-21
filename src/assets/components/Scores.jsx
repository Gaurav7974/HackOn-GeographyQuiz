import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

function Scores() {
  const [scores, setScores] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/scores");
        setScores(response.data);
      } catch (error) {
        console.error("Failed to fetch scores:", error);
      }
    };
    fetchScores();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>Recent Scores</h2>
      <table border="1" style={{ margin: "auto", width: "50%", textAlign: "left" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Difficulty</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.score}</td>
              <td>{user.difficulty}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <button onClick={() => navigate("/")}>Home</button>
    </div>
  );
}

export default Scores;
