const arcjet = require("@arcjet/node").default;
const { detectBot, shield, tokenBucket } = require("@arcjet/node");
const { isSpoofedBot } = require("@arcjet/inspect");

const aj = arcjet({
  key: process.env.ARCJET_KEY,
  rules: [
    // Shield protects your app from common attacks e.g. SQL injection
    shield({ mode: "LIVE" }),
    // Create a bot detection rule
    detectBot({
      mode: "LIVE", // Blocks requests. Use "DRY_RUN" to log only
      // Block all bots except the following
      allow: [
        "CATEGORY:SEARCH_ENGINE", // Google, Bing, etc
      ],
    }),
    // Create a token bucket rate limit. Other algorithms are supported.
    tokenBucket({
      mode: "LIVE",
      refillRate: 5, // Refill 5 tokens per interval
      interval: 10, // Refill every 10 seconds
      capacity: 10, // Bucket capacity of 10 tokens
    }),
  ],
});

const arcjetMiddleware = async (req, res, next) => {
  try {
    const decision = await aj.protect(req, { requested: 1 }); // Deduct 1 token per request for standard endpoints

    // console.log("Arcjet decision", decision); // Optional logging

    if (decision.isDenied()) {
      if (decision.reason.isRateLimit()) {
        return res.status(429).json({ error: "Too many requests" });
      } else if (decision.reason.isBot()) {
        return res.status(403).json({ error: "No bots allowed" });
      } else {
        return res.status(403).json({ error: "Forbidden" });
      }
    }

    // Check for hosting IP (often bots/VPNs) - Strict Mode could use this
    // if (decision.ip.isHosting()) {
    //   return res.status(403).json({ error: "Forbidden (Hosting IP)" });
    // }

    // Check for spoofed bots (Paid feature, but good to include logic)
    if (decision.results.some(isSpoofedBot)) {
      return res.status(403).json({ error: "Forbidden (Spoofed Bot)" });
    }

    next();
  } catch (error) {
    console.error("Arcjet Middleware Error:", error);
    // Fail open or closed? Usually fail open for security services if they crash to avoid outage
    // next();
    // Or fail closed:
    next(error);
  }
};

module.exports = arcjetMiddleware;