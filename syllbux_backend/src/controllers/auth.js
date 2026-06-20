import * as authService from '../services/auth.js';
import { HttpError } from '../utils/httpError.js';

export async function register(req, res, next) {
  try {
    const { first_name, last_name, email, password, role } = req.body ?? {};
    if (!first_name || !last_name || !email || !password || !role) {
      throw new HttpError(
        400,
        'first_name, last_name, email, password, role are required'
      );
    }
    if (!['student', 'instructor', 'admin'].includes(role)) {
      throw new HttpError(400, 'role must be student, instructor, or admin');
    }
    const user = await authService.register({
      first_name,
      last_name,
      email,
      password,
      role,
    });
    res.status(201).json(user);
  } catch (err) {
    next(err);
  }
}

export async function login(req, res, next) {
  try {
    const { email, password } = req.body ?? {};
    if (!email || !password) {
      throw new HttpError(400, 'email and password are required');
    }
    const result = await authService.login({ email, password });
    if (!result) throw new HttpError(401, 'Invalid credentials');
    res.json(result);
  } catch (err) {
    next(err);
  }
}