import Redis from 'ioredis';

// Check if Redis is available
const isRedisEnabled = () => {
  return process.env.REDIS_URL && process.env.REDIS_URL !== '';
};

// Create Redis client only if enabled
let redis = null;

if (isRedisEnabled()) {
  try {
    redis = new Redis(process.env.REDIS_URL, {
      maxRetriesPerRequest: 3,
      retryStrategy(times) {
        const delay = Math.min(times * 50, 2000);
        return delay;
      },
      reconnectOnError(err) {
        const targetError = 'READONLY';
        if (err.message.includes(targetError)) {
          return true;
        }
        return false;
      }
    });

    redis.on('connect', () => {
      console.log('✅ Redis Connected - Caching Enabled');
    });

    redis.on('error', (err) => {
      console.error('❌ Redis Error:', err.message);
      console.log('⚠️  App will continue without caching');
    });
  } catch (error) {
    console.error('❌ Redis initialization failed:', error.message);
    console.log('⚠️  App will continue without caching');
    redis = null;
  }
} else {
  console.log('ℹ️  Redis not configured - Caching disabled (App will work without Redis)');
}

// In-memory cache fallback (for development without Redis)
const memoryCache = new Map();
const MEMORY_CACHE_MAX_SIZE = 100;

// Cache utility functions with fallback to memory
export const cache = {
  // Get from cache
  async get(key) {
    if (redis) {
      try {
        const value = await redis.get(key);
        return value ? JSON.parse(value) : null;
      } catch (error) {
        console.error('Redis GET error:', error.message);
      }
    }
    
    // Fallback to memory cache
    const cached = memoryCache.get(key);
    if (cached && cached.expiry > Date.now()) {
      return cached.value;
    }
    return null;
  },

  // Set to cache with TTL (in seconds)
  async set(key, value, ttl = 3600) {
    if (redis) {
      try {
        await redis.setex(key, ttl, JSON.stringify(value));
        return true;
      } catch (error) {
        console.error('Redis SET error:', error.message);
      }
    }
    
    // Fallback to memory cache
    if (memoryCache.size >= MEMORY_CACHE_MAX_SIZE) {
      const firstKey = memoryCache.keys().next().value;
      memoryCache.delete(firstKey);
    }
    
    memoryCache.set(key, {
      value,
      expiry: Date.now() + (ttl * 1000)
    });
    return true;
  },

  // Delete from cache
  async del(key) {
    if (redis) {
      try {
        await redis.del(key);
        return true;
      } catch (error) {
        console.error('Redis DEL error:', error.message);
      }
    }
    
    memoryCache.delete(key);
    return true;
  },

  // Delete multiple keys by pattern
  async delPattern(pattern) {
    if (redis) {
      try {
        const keys = await redis.keys(pattern);
        if (keys.length > 0) {
          await redis.del(...keys);
        }
        return true;
      } catch (error) {
        console.error('Redis DEL PATTERN error:', error.message);
      }
    }
    
    // Fallback: delete from memory cache
    const regex = new RegExp(pattern.replace('*', '.*'));
    for (const key of memoryCache.keys()) {
      if (regex.test(key)) {
        memoryCache.delete(key);
      }
    }
    return true;
  },

  // Check if key exists
  async exists(key) {
    if (redis) {
      try {
        const result = await redis.exists(key);
        return result === 1;
      } catch (error) {
        console.error('Redis EXISTS error:', error.message);
      }
    }
    
    const cached = memoryCache.get(key);
    return cached && cached.expiry > Date.now();
  },

  // Get multiple keys
  async mget(keys) {
    if (redis) {
      try {
        const values = await redis.mget(keys);
        return values.map(v => v ? JSON.parse(v) : null);
      } catch (error) {
        console.error('Redis MGET error:', error.message);
      }
    }
    
    return keys.map(key => {
      const cached = memoryCache.get(key);
      if (cached && cached.expiry > Date.now()) {
        return cached.value;
      }
      return null;
    });
  },

  // Set multiple keys
  async mset(keyValuePairs, ttl = 3600) {
    if (redis) {
      try {
        const pipeline = redis.pipeline();
        
        for (const [key, value] of Object.entries(keyValuePairs)) {
          pipeline.setex(key, ttl, JSON.stringify(value));
        }
        
        await pipeline.exec();
        return true;
      } catch (error) {
        console.error('Redis MSET error:', error.message);
      }
    }
    
    // Fallback to memory cache
    for (const [key, value] of Object.entries(keyValuePairs)) {
      await this.set(key, value, ttl);
    }
    return true;
  },

  // Increment counter
  async incr(key, ttl = 3600) {
    if (redis) {
      try {
        const result = await redis.incr(key);
        if (result === 1 && ttl > 0) {
          await redis.expire(key, ttl);
        }
        return result;
      } catch (error) {
        console.error('Redis INCR error:', error.message);
      }
    }
    
    // Fallback to memory cache
    const cached = memoryCache.get(key);
    const currentValue = (cached && cached.expiry > Date.now()) ? cached.value : 0;
    const newValue = currentValue + 1;
    
    memoryCache.set(key, {
      value: newValue,
      expiry: Date.now() + (ttl * 1000)
    });
    return newValue;
  }
};

export default redis;