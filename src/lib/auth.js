import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';

const JWT_SECRET = process.env.JWT_SECRET || 'supersecretjwtkeyforraktseva123!';

export async function hashPassword(password) {
  return await bcrypt.hash(password, 10);
}

export async function comparePassword(password, hashed) {
  return await bcrypt.compare(password, hashed);
}

export function signToken(payload) {
  return jwt.sign(payload, JWT_SECRET, { expiresIn: '7d' });
}

export function verifyToken(token) {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    return null;
  }
}
