const redis = require("redis")

const redisPort = process.env.PORT || 6379;
const redisHost = 'localhost';

const redisClient = () => {
  return process.env.NODE_ENV === 'production'
    ? redis.createClient(process.env.REDISCLOUD_URL)
    : redis.createClient(redisPort, redisHost);
}

module.exports = redisClient;