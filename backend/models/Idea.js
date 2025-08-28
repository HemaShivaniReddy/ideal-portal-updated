
import mongoose from "mongoose";

const IdeaSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  status: { type: String, enum: ["Pending", "Approved", "Rejected"], default: "Pending" },
  rejectionReason: { type: String, default: "" }
}, { timestamps: true });

export default mongoose.model("Idea", IdeaSchema);
