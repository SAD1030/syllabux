import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import pool from '../config/db.js';
import { getByEmail } from './users.js';

// Number of bcrypt salt rounds. 12 is a strong default — ~250ms per hash on
// modern hardware. Lower it (10) for tests if you need to speed things up.
const BCRYPT_ROUNDS = 12;

export async function register({
  first_name,
  last_name,
  email,
  password,
  role,
}) {
  const password_hash = await bcrypt.hash(password, BCRYPT_ROUNDS);

  const [result] = await pool.query(
    `INSERT INTO Users (first_name, last_name, email, password_hash, role)
     VALUES (?, ?, ?, ?, ?)`,
    [first_name, last_name, email, password_hash, role]
  );

  const [rows] = await pool.query(
    'SELECT user_id, first_name, last_name, email, role FROM Users WHERE user_id = ?',
    [result.insertId]
  );
  return rows[0];
}

export async function login({ email, password }) {
  const user = await getByEmail(email);
  if (!user) return null;

  const ok = await bcrypt.compare(password, user.password_hash);
  if (!ok) return null;

  const token = jwt.sign(
    { sub: user.user_id, role: user.role },
    process.env.JWT_SECRET,
    { expiresIn: process.env.JWT_EXPIRES_IN }
  );

  return {
    token,
    user: {
      user_id: user.user_id,
      first_name: user.first_name,
      last_name: user.last_name,
      email: user.email,
      role: user.role,
    },
  };
}