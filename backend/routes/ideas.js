
import express from "express";
import Idea from "../models/Idea.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();

// Create idea
router.post("/", authMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title || !description) return res.status(400).json({ error: "title & description required" });
    const idea = await Idea.create({ title, description, userId: req.user.id });
    res.json(idea);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

// Get my ideas
router.get("/mine", authMiddleware, async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.user.id }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (e) {
    res.status(500).json({ error: e.message });
  }
});

export default router;
