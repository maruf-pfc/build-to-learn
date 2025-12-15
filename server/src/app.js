const express = require("express");
const cors = require("cors");
const morgan = require("morgan");
require("dotenv").config();
const cookieParser = require("cookie-parser");
const routes = require("./routes");

const app = express();

// CORS Configuration
app.use(
  cors({
    origin: ["http://localhost:3339", "http://127.0.0.1:3339"],
    credentials: true,
    methods: ["GET", "POST", "PUT", "DELETE", "PATCH", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  }),
);

app.use(morgan("dev"));
app.use(express.json());
app.use(cookieParser());
app.use("/uploads", express.static("uploads"));

// Security Middleware
const arcjetMiddleware = require("./middlewares/arcjet.middleware");
app.use(arcjetMiddleware);

app.get("/health", (req, res) =>
  res.json({ status: "ok", env: process.env.NODE_ENV || "dev" }),
);

app.use("/api", routes);

// Global Error Handler
app.use((err, req, res, next) => {
  console.error("❌ Global Error:", err.stack);
  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    error: process.env.NODE_ENV === "development" ? err : {},
  });
});

module.exports = app;
