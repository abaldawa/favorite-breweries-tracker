/**
 * @author Abhijit Baldawa
 */

class ValidationError extends Error {
  public details?: unknown;

  constructor(message: string, details?: unknown) {
    super(message);
    this.details = details;
  }
}

export { ValidationError };
