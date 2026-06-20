import { HttpError } from '../utils/httpError.js';

// Central error handler. Mounted LAST in app.js so it catches everything.
export function errorHandler(err, _req, res, _next) {
  // MySQL duplicate-key violation → 409 Conflict
  if (err?.code === 'ER_DUP_ENTRY') {
    return res.status(409).json({ message: 'Duplicate entry' });
  }

  // MySQL "not found" from a write that affected 0 rows is handled by services;
  // this branch is for actual query errors we didn't anticipate.
  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: 'Internal Server Error' });
}