// https://nodejs.org

class ApiError extends Error {
  constructor(
    statusCode,
    message = "Error aai he sir !",
    errors = [],
    errorStack = ""
  ) {
    super(message);
    this.statusCode = statusCode;
    this.data = null;
    this.message = message;
    this.success = false;
    this.errors = errors;
    errorStack
      ? (this.errorStack = errorStack)
      : Error.captureStackTrace(this, this.constructor);
  }
}

export default ApiError;
