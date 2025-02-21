import React, { useEffect, useState } from "react";

function Leaderboard() {
  const [scores, setScores] = useState([]);

  useEffect(() => {
    const fetchScores = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/users/top-scores");
        const data = await response.json();
        setScores(data);
      } catch (error) {
        console.error("Error fetching scores:", error);
      }
    };

    fetchScores();
  }, []);

  return (
    <div style={{ textAlign: "center", padding: "20px" }}>
      <h2>🏆 Leaderboard - Recent Scores</h2>
      <table border="1" style={{ margin: "auto", padding: "10px" }}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Score</th>
            <th>Date</th>
          </tr>
        </thead>
        <tbody>
          {scores.map((user, index) => (
            <tr key={index}>
              <td>{user.name}</td>
              <td>{user.score}</td>
              <td>{new Date(user.createdAt).toLocaleString()}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default Leaderboard;
