
import bcrypt from "bcryptjs";
import User from "../models/User.js";

export default async function seedManager() {
  const email = process.env.SEED_MANAGER_EMAIL || "admin@portal.com";
  const password = process.env.SEED_MANAGER_PASSWORD || "password123";
  let user = await User.findOne({ email });
  if (!user) {
    const passwordHash = await bcrypt.hash(password, 10);
    user = await User.create({ email, passwordHash, role: "manager" });
    console.log(`🔐 Seeded manager: ${email}`);
  } else if (user.role !== "manager") {
    user.role = "manager";
    await user.save();
    console.log(`🔐 Updated role to manager for: ${email}`);
  } else {
    console.log(`ℹ️ Manager already present: ${email}`);
  }
}
