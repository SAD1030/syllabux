// Error class that carries an HTTP status code through to the error handler.
export class HttpError extends Error {
  constructor(status, message) {
    super(message);
    this.status = status;
  }
}