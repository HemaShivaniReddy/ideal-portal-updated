
import React, { useState } from "react";
import api from "../api";

export default function SubmitIdea() {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");

  const submit = async (e) => {
    e.preventDefault();
    try {
      await api.post("/ideas", { title, description });
      setTitle(""); setDescription("");
      alert("Idea submitted!");
    } catch (e) {
      alert(e.response?.data?.error || "Failed to submit");
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "40px auto" }}>
      <h2>Submit Idea</h2>
      <form onSubmit={submit} style={{ display: "grid", gap: 8 }}>
        <input placeholder="Title" value={title} onChange={e=>setTitle(e.target.value)} />
        <textarea placeholder="Description" value={description} onChange={e=>setDescription(e.target.value)} />
        <button type="submit">Submit</button>
      </form>
    </div>
  );
}
