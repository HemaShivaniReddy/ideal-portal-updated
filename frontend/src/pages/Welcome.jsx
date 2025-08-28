
import React from "react";
import { Link } from "react-router-dom";

export default function Welcome() {
  return (
    <div style={{ padding: 24 }}>
      <h1>Welcome to Ideal Portal</h1>
      <p>Submit your innovative ideas and track their status.</p>
      <div style={{ display: "flex", gap: 12, marginTop: 16 }}>
        <Link to="/submit"><button>Submit Idea</button></Link>
        <Link to="/ideas"><button>My Ideas</button></Link>
      </div>
    </div>
  );
}
