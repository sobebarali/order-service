import Redis from "ioredis";

const redis = new Redis();

export const getCache = async (key: string): Promise<string | null> => {
  return redis.get(key);
};

export const setCache = async (
  key: string,
  value: string,
  expirationTime: number
): Promise<void> => {
  await redis.set(key, value, "EX", expirationTime);
};

export const invalidateCache = async (key: string): Promise<void> => {
  await redis.del(key);
};
