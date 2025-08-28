
import React from "react";
import ReactDOM from "react-dom/client";
import { BrowserRouter, Routes, Route, Navigate, Link } from "react-router-dom";
import Login from "./pages/Login.jsx";
import ManagerLogin from "./pages/ManagerLogin.jsx";
import Welcome from "./pages/Welcome.jsx";
import SubmitIdea from "./pages/SubmitIdea.jsx";
import IdeasPage from "./pages/IdeasPage.jsx";
import ManagerPage from "./pages/ManagerPage.jsx";

function isAuthed() {
  return !!localStorage.getItem("token");
}
function getUser() {
  try { return JSON.parse(localStorage.getItem("user")) } catch { return null }
}

function Protected({ children, managerOnly=false }) {
  if (!isAuthed()) return <Navigate to="/login" replace />
  const u = getUser();
  if (managerOnly && u?.role !== "manager") return <Navigate to="/welcome" replace />
  return children;
}

function NavBar() {
  const user = getUser();
  const logout = () => { localStorage.clear(); location.href = "/login"; };
  return (
    <nav style={{display:"flex", gap:12, padding:12, borderBottom:"1px solid #ddd"}}>
      <Link to="/welcome">Home</Link>
      <Link to="/submit">Submit Idea</Link>
      <Link to="/ideas">My Ideas</Link>
      {user?.role === "manager" && <Link to="/manager">Manager</Link>}
      <span style={{marginLeft:"auto"}}>{user?.email}</span>
      {isAuthed() ? <button onClick={logout}>Logout</button> : <Link to="/login">Login</Link>}
    </nav>
  );
}

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<Login />} />
        <Route path="/manager-login" element={<ManagerLogin />} />
        <Route path="/welcome" element={<Protected><Welcome /></Protected>} />
        <Route path="/submit" element={<Protected><SubmitIdea /></Protected>} />
        <Route path="/ideas" element={<Protected><IdeasPage /></Protected>} />
        <Route path="/manager" element={<Protected managerOnly><ManagerPage /></Protected>} />
      </Routes>
    </BrowserRouter>
  );
}

ReactDOM.createRoot(document.getElementById("root")).render(<App />);
