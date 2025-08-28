
import express from "express";
import mongoose from "mongoose";
import dotenv from "dotenv";
import cors from "cors";
import authRoutes from "./routes/auth.js";
import ideasRoutes from "./routes/ideas.js";
import managerRoutes from "./routes/manager.js";
import seedManager from "./seed/seedManager.js";

dotenv.config();

const app = express();
app.use(express.json());

// CORS (adjust origins as needed; for dev allow all)
app.use(cors({
  origin: ["http://localhost:5173", "http://localhost:3000", process.env.FRONTEND_URL || ""].filter(Boolean),
  credentials: true
}));

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://127.0.0.1:27017/ideal_portal_demo";

// Routes
app.use("/api/auth", authRoutes);
app.use("/api/ideas", ideasRoutes);
app.use("/api/manager", managerRoutes);

app.get("/", (req, res) => res.json({ ok: true, service: "ideal-portal-backend" }));

mongoose.connect(MONGO_URI, { })
  .then(async () => {
    console.log("✅ MongoDB connected");
    // Seed default manager
    await seedManager();
    app.listen(PORT, () => {
      console.log(`✅ Backend running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message || err);
    process.exit(1);
  });
