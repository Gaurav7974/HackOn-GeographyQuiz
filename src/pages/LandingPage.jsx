import React from "react";
import { useNavigate } from "react-router-dom";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div
      style={{
        backgroundImage: "url('/line-drive-asphalt-countryside-cloud.jpg')", // ✅ Corrected path
        backgroundSize: "cover",
        backgroundPosition: "center",
        backgroundRepeat: "no-repeat",
        width: "100vw", // ✅ Full viewport width
        minHeight: "100vh", // ✅ Ensures full page height
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        color: "white",
        textAlign: "center",
      }}
    >
      <h1 style={{ fontSize: "48px", fontWeight: "bold" }}>EXPLORE THE UNKNOWN WORLD</h1>
      <button
        onClick={() => navigate("/quiz")}
        style={{
          marginTop: "20px",
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
    </div>
  );
}

export default LandingPage;
