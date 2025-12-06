import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET;

if (!JWT_SECRET) {
  throw new Error('Please define JWT_SECRET in your environment variables');
}

// Hash plain password
export async function hashPassword(password) {
  const salt = await bcrypt.genSalt(10);
  return bcrypt.hash(password, salt);
}

// Compare password with hash
export async function comparePassword(plain, hash) {
  return bcrypt.compare(plain, hash);
}

// Sign JWT
export function signToken(payload, options = {}) {
  return jwt.sign(payload, JWT_SECRET, {
    expiresIn: '7d',
    ...options,
  });
}

// Verify JWT
export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch {
    return null;
  }
}
