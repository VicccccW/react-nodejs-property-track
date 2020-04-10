const redis = require("redis")

//set redis local config
const redisPort = process.env.PORT_REDIS || 6379;
const redisHost = 'localhost';

const createRedisClient = () => {
  return process.env.NODE_ENV === 'production'
    ? redis.createClient(process.env.REDIS_URL)
    : redis.createClient(redisPort, redisHost)
}

const redisClient = createRedisClient();

module.exports = redisClient;