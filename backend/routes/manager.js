
import express from "express";
import Idea from "../models/Idea.js";
import { authMiddleware, managerOnly } from "../middleware/auth.js";

const router = express.Router();

// All ideas (manager)
router.get("/ideas", authMiddleware, managerOnly, async (req, res) => {
  try {
    const ideas = await Idea.find().populate("userId", "email").sort({ createdAt: -1 });
    res.json(ideas);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Approve idea
router.put("/ideas/:id/approve", authMiddleware, managerOnly, async (req, res) => {
  try {
    const doc = await Idea.findByIdAndUpdate(req.params.id, { status: "Approved", rejectionReason: "" }, { new: true });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Reject idea (with reason)
router.put("/ideas/:id/reject", authMiddleware, managerOnly, async (req, res) => {
  try {
    const { reason } = req.body;
    if (!reason) return res.status(400).json({ error: "reason required" });
    const doc = await Idea.findByIdAndUpdate(req.params.id, { status: "Rejected", rejectionReason: reason }, { new: true });
    res.json(doc);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
