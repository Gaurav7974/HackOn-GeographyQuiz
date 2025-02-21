



import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('/line-drive-asphalt-countryside-cloud.jpg')",
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw",
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>EXPLORE THE UNKNOWN WORLD</h1>

      <div style={{ display: "flex", gap: "20px", marginTop: "20px" }}>
        {/* Single Player Button */}
        <button
          onClick={() => navigate("/quiz")}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            backgroundColor: "#007bff",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#0056b3")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#007bff")}
        >
          Single Player
        </button>

        {/* Multiplayer Button */}
        <button
          onClick={() => navigate("/multi")}
          style={{
            padding: "15px 30px",
            fontSize: "20px",
            backgroundColor: "#28a745",
            color: "white",
            border: "none",
            borderRadius: "8px",
            cursor: "pointer",
            transition: "0.3s",
          }}
          onMouseOver={(e) => (e.target.style.backgroundColor = "#218838")}
          onMouseOut={(e) => (e.target.style.backgroundColor = "#28a745")}
        >
          Multiplayer
        </button>
      </div>
    </div>
  );
}

export default LandingPage;
