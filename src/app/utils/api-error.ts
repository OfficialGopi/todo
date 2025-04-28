class ApiError extends Error {
  public statusCode: number;
  public success: boolean;
  public errors: any[];
  public message: string;
  constructor(
    statusCode: number,
    message: string = "Something went wrong",
    errors = [],
    stack: string | undefined = "",
  ) {
    super(message);
    this.statusCode = statusCode;
    this.message = message;
    this.success = false;
    this.errors = errors;

    if (stack) {
      this.stack = stack;
    } else {
      // ============ Error.captureStackTrace(this, this.constructor) is called to generate a stack trace automatically ================
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
