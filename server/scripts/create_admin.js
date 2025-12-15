require("dotenv").config();
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/modules/users/user.model");

const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/build-to-learn";

async function createAdmin() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log("Connected to MongoDB");

    const email = "admin@btl.com";
    const password = "admin";

    const existing = await User.findOne({ email });
    if (existing) {
      console.log(
        "Admin user already exists. Updating pass/role just in case.",
      );
      existing.role = "admin";
      existing.passwordHash = await bcrypt.hash(password, 10);
      await existing.save();
      console.log("Admin updated.");
    } else {
      const passwordHash = await bcrypt.hash(password, 10);
      await User.create({
        name: "Super Admin",
        email,
        passwordHash,
        role: "admin",
        bio: "System Administrator",
      });
      console.log("Admin created.");
    }

    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

createAdmin();
