
import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import api from "../api";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await api.post("/auth/login", { email, password });
      if (data.user.role !== "user") return alert("This login is for users only.");
      localStorage.setItem("token", data.token);
      localStorage.setItem("user", JSON.stringify(data.user));
      nav("/welcome");
    } catch (e) {
      alert(e.response?.data?.error || "Login failed");
    }
  };

  return (
    <div style={{ maxWidth: 380, margin: "80px auto" }}>
      <h2>User Login</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input placeholder="Email" type="email" value={email} onChange={e=>setEmail(e.target.value)} />
        <input placeholder="Password" type="password" value={password} onChange={e=>setPassword(e.target.value)} />
        <button type="submit">Login</button>
      </form>
      <p style={{marginTop:12}}>
        Are you a manager? <Link to="/manager-login">Manager Login</Link>
      </p>
    </div>
  );
}
