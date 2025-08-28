
import React, { useEffect, useState } from "react";
import api from "../api";

export default function ManagerPage() {
  const [ideas, setIdeas] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState("Pending");
  const [reasons, setReasons] = useState({});

  useEffect(() => {
    api.get("/manager/ideas").then(({data}) => {
      setIdeas(data); setLoading(false);
    }).catch(() => setLoading(false));
  }, []);

  const approve = async (id) => {
    await api.put(`/manager/ideas/${id}/approve`);
    setIdeas(prev => prev.map(i => i._id === id ? { ...i, status: "Approved", rejectionReason: "" } : i));
  };

  const reject = async (id) => {
    const reason = reasons[id];
    if (!reason) return alert("Please enter a rejection reason");
    await api.put(`/manager/ideas/${id}/reject`, { reason });
    setIdeas(prev => prev.map(i => i._id === id ? { ...i, status: "Rejected", rejectionReason: reason } : i));
  };

  if (loading) return <p>Loading ideas...</p>;

  const filtered = ideas.filter(i => i.status === filter);

  return (
    <div style={{ padding: 24 }}>
      <h1>Manager Dashboard</h1>

      <div style={{ display: "flex", gap: 8, margin: "12px 0" }}>
        {["Pending", "Approved", "Rejected"].map(tab => (
          <button key={tab} onClick={() => setFilter(tab)} style={{ padding: "6px 12px", background: filter===tab?"#2563eb":"#e5e7eb", color: filter===tab?"#fff":"#000", border: "none", borderRadius: 6 }}>
            {tab}
          </button>
        ))}
      </div>

      {filtered.length === 0 ? <p>No {filter} ideas.</p> : filtered.map(idea => (
        <div key={idea._id} style={{ border: "1px solid #ddd", padding: 12, borderRadius: 8, margin: "8px 0", background:"#f9fafb" }}>
          <h3>{idea.title}</h3>
          <p>{idea.description}</p>
          <p>Submitted by: {idea.userId?.email || "Unknown"}</p>
          <p>Status: <b>{idea.status}</b></p>

          {idea.status === "Pending" && (
            <div style={{ marginTop: 8, display: "grid", gap: 6 }}>
              <div>
                <textarea placeholder="Reason for rejection" value={reasons[idea._id] || ""} onChange={e=>setReasons(prev => ({...prev, [idea._id]: e.target.value}))} />
              </div>
              <div style={{ display: "flex", gap: 8 }}>
                <button onClick={() => approve(idea._id)} style={{ background: "green", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6 }}>Approve</button>
                <button onClick={() => reject(idea._id)} style={{ background: "crimson", color: "#fff", border: "none", padding: "6px 10px", borderRadius: 6 }}>Reject</button>
              </div>
            </div>
          )}

          {idea.status === "Rejected" && idea.rejectionReason && (
            <p>Reason: {idea.rejectionReason}</p>
          )}
        </div>
      ))}
    </div>
  );
}
