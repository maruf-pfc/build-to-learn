require("dotenv").config({ path: "../.env" }); // Adjust path if running from scripts dir
const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const User = require("../src/modules/users/user.model");
const Course = require("../src/modules/course/course.model");
const Module = require("../src/modules/course/module.model");

const seedParams = {
  mongoURI: process.env.MONGO_URI || "mongodb://localhost:27017/build-to-learn", // Fallback
};

const seed = async () => {
  try {
    await mongoose.connect(seedParams.mongoURI);
    console.log("Connected to DB");

    // Clear DB
    await User.deleteMany({});
    await Course.deleteMany({});
    await Module.deleteMany({});

    // Create Instructor
    const passwordHash = await bcrypt.hash("password123", 10);
    const instructor = await User.create({
      name: "Master Yoda",
      email: "yoda@jedi.com",
      passwordHash,
      role: "instructor",
      bio: "Grand Master of the Jedi Order",
    });

    // Create Student
    await User.create({
      name: "Luke Skywalker",
      email: "luke@jedi.com",
      passwordHash,
      role: "student",
    });

    // Create Course 1
    const jsCourse = await Course.create({
      title: "Advanced JavaScript",
      description: "Master the weird parts of JS.",
      category: "Programming",
      instructor: instructor._id,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/6/6a/JavaScript-logo.png",
    });

    // Create Module for Course 1
    await Module.create({
      course: jsCourse._id,
      title: "Module 1: Closures",
      order: 1,
      subModules: [
        {
          title: "Introduction to Closures",
          type: "documentation",
          content:
            "# Closures\n\nA closure is the combination of a function bundled together (enclosed) with references to its surrounding state.",
        },
        {
          title: "Closure Quiz",
          type: "mcq",
          questions: [
            {
              questionText: "What is a closure?",
              options: ["A function", "A variable", "Both", "None"],
              correctAnswer: "Both",
            },
          ],
        },
      ],
    });

    // Create Course 2
    await Course.create({
      title: "React Mastery",
      description: "Build modern UIs with React.",
      category: "Frontend",
      instructor: instructor._id,
      thumbnail:
        "https://upload.wikimedia.org/wikipedia/commons/a/a7/React-icon.svg",
    });

    console.log("Seeding complete!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

seed();
