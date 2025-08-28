
import React, { useEffect, useState } from "react";
import api from "../api";

export default function IdeasPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    api.get("/ideas/mine").then(({data}) => {
      setIdeas(data); setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  if (loading) return <p>Loading your ideas...</p>;

  return (
    <div style={{ padding: 24 }}>
      <h2>My Ideas</h2>
      {ideas.length === 0 ? <p>No ideas yet.</p> : ideas.map(idea => (
        <div key={idea._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, margin: "8px 0" }}>
          <h3>{idea.title}</h3>
          <p>{idea.description}</p>
          <p>
            Status: <b style={{ color: idea.status === "Approved" ? "green" : idea.status === "Rejected" ? "red" : "orange" }}>
              {idea.status}
            </b>
          </p>
          {idea.status === "Rejected" && idea.rejectionReason && (
            <p>Reason: {idea.rejectionReason}</p>
          )}
        </div>
      ))}
    </div>
  );
}
