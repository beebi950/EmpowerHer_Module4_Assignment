let requestCount = 0;
let lastReset = Date.now();

const rateLimiter = (req, res, next) => {
  const now = Date.now();

  // reset every 1 minute
  if (now - lastReset >= 60000) {
    requestCount = 0;
    lastReset = now;
  }

  requestCount++;

  if (requestCount > 15) {
    return res.status(429).json({
      error: "Too many requests, please try again later"
    });
  }

  next();
};

export default rateLimiter;
