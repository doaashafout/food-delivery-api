const rateLimit = require("express-rate-limit");
const Redis = require("ioredis");

const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: {
    success: false,
    message: "Too many requests, please try again later.",
  },
});

const authLimiter = rateLimit({
  windowMs: 10 * 60 * 1000,
  max: 20,
  message: {
    success: false,
    message: "Too many auth attempts, please try again later.",
  },
});

const requestCounts = {};

const customRateLimiter = (maxRequests = 5, windowMs = 10000) => {
  return (req, res, next) => {
    const ip = req.ip || req.connection.remoteAddress;
    const now = Date.now();

    if (!requestCounts[ip]) {
      requestCounts[ip] = { count: 1, startTime: now };
      return next();
    }

    const elapsed = now - requestCounts[ip].startTime;

    if (elapsed > windowMs) {
      requestCounts[ip] = { count: 1, startTime: now };
      return next();
    }

    requestCounts[ip].count++;

    if (requestCounts[ip].count > maxRequests) {
      return res.status(429).send({
        success: false,
        message: `Too many requests. Max ${maxRequests} per ${windowMs / 1000}s`,
      });
    }

    next();
  };
};

let redisClient = null;
let redisAvailable = false;

try {
  redisClient = new Redis({
    host: process.env.REDIS_HOST || "127.0.0.1",
    port: process.env.REDIS_PORT || 6379,
    lazyConnect: true,
  });

  redisClient.on("ready", () => {
    redisAvailable = true;
    console.log("Redis connected for rate limiting".cyan);
  });

  redisClient.on("error", () => {
    redisAvailable = false;
  });
} catch (err) {
  redisAvailable = false;
}

const redisRateLimiter = (maxRequests = 10, windowMs = 60000) => {
  return async (req, res, next) => {
    if (!redisAvailable) {
      return customRateLimiter(maxRequests, windowMs)(req, res, next);
    }

    const key = `rate_limit:${req.ip || req.connection.remoteAddress}`;

    try {
      const current = await redisClient.incr(key);

      if (current === 1) {
        await redisClient.pexpire(key, windowMs);
      }

      if (current > maxRequests) {
        return res.status(429).send({
          success: false,
          message: `Rate limit exceeded. Max ${maxRequests} requests per ${windowMs / 1000}s`,
        });
      }

      next();
    } catch (err) {
      return customRateLimiter(maxRequests, windowMs)(req, res, next);
    }
  };
};

module.exports = { apiLimiter, authLimiter, customRateLimiter, redisRateLimiter };
