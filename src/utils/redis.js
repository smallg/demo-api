const { createClient } = require('redis');

let client;

const redisClient = async () => {
  if (client) return;
  client = await createClient()
    .on('error', (err) => console.log('Redis connect failed', err))
    .connect();
};

const setKey = async (key, value, ttl = null) => {
  if (!client) {
    await redisClient();
  }
  value = JSON.stringify(value);
  await client.set(key, value);

  if (ttl !== null) {
    await client.expire(key, ttl);
  }
};

const getKey = async (key) => {
  if (!client) {
    await redisClient();
  }
  const value = await client.get(key);
  return value ? JSON.parse(value) : null;
};

const delKey = async (key) => {
  if (!client) {
    await redisClient();
  }
  await client.del(key);
};

module.exports = { setKey, getKey, delKey };
