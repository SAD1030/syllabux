import { HttpError } from "../utils/httpError.js";

export function errorHandler(err, _req, res, _next) {
  if (err?.code === "ER_DUP_ENTRY") {
    return res.status(409).json({ message: "Duplicate entry" });
  }

  if (err instanceof HttpError) {
    return res.status(err.status).json({ message: err.message });
  }

  console.error(err);
  res.status(500).json({ message: "Internal Server Error" });
}