const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
const cookieParser = require("cookie-parser");
require("dotenv").config();

const routes = require("./routes");

const app = express();

/* ================= CORS ================= */
app.use(
  cors({
    origin: ["https://build-to-learn.vercel.app", "http://localhost:3339", "http://127.0.0.1:3339"],
    credentials: true,
  }),
);

/* ================= MIDDLEWARE ================= */
app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

/* ================= SECURITY ================= */
// ❗ DO NOT run Arcjet during tests
if (process.env.NODE_ENV !== "test") {
  const arcjetMiddleware = require("./middlewares/arcjet.middleware");
  app.use(arcjetMiddleware);
}

/* ================= HEALTH ================= */
app.get("/health", (req, res) =>
  res.json({ status: "ok", env: process.env.NODE_ENV }),
);

/* ================= ROUTES ================= */
app.use("/api", routes);

/* ================= ERROR HANDLER ================= */
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
  });
});

module.exports = app;
