const redis = require("redis")

const redisPort = process.env.PORT || 6379;
const redisHost = 'localhost';

function createRedisClient() {
  return process.env.NODE_ENV === 'production'
    ? redis.createClient(process.env.REDIS_URL)
    : redis.createClient(redisPort, redisHost)
}

const redisClient = createRedisClient();

module.exports = redisClient;