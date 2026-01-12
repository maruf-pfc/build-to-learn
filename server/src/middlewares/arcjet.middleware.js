const arcjetMiddleware = async (req, res, next) => {
  if (
    req.method === "OPTIONS" ||
    req.path.startsWith("/api/auth")
  ) {
    return next();
  }

  try {
    const decision = await aj.protect(req, { requested: 1 });

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many requests" });
      }
      if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      }
      return res.status(403).json({ error: "Forbidden" });
    }

    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Forbidden (Spoofed Bot)" });
    }

    next();
  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    next(); // ✅ fail open (recommended)
  }
};
