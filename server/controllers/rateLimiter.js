const redisClient = require("../redis");

module.exports.rateLimiter = (ttl, numLimit) => async (req, res, next) => {
  const ip = req.connection.remoteAddress;
  const [response] = await redisClient.multi().incr(ip).expire(ip, ttl).exec();

  if (response[1] > numLimit) {
    res.json({
      loggedIn: false,
      status: "Too many attempts! Try again in 60 secs",
    });
  } else {
    next();
  }
};
