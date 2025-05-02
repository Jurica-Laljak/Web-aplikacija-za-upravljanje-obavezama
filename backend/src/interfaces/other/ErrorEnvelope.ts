import { head } from "../../api/routes/toDoListRouter";

export class ErrorEnvelope extends Error {
  errorCode: number;
  redirect?: string;
  headers: Map<string, string>;

  constructor(
    message: string,
    errorCode: number,
    redirect?: string | undefined,
    headers?: Array<[string, string]> | undefined
  ) {
    super(message);
    this.errorCode = errorCode;
    redirect ? (this.redirect = redirect) : (this.redirect = undefined);
    this.headers = new Map();
    if (headers) {
      headers.forEach((el) => {
        this.headers.set(el[0], el[1]);
      });
    }
  }

  toString(): string {
    return `message: ${this.message},
    errorCode: ${this.errorCode},
    redirect: ${this.redirect},
    headers: ${this.headers.forEach(
      (key) => `${key}: ${this.headers.get(key)}\n`
    )}`;
  }

  // commonly used error types
  static databaseError(): ErrorEnvelope {
    return new ErrorEnvelope("Database Error", 500);
  }

  static userCredentialsError(): ErrorEnvelope {
    return new ErrorEnvelope("Username or password error", 400);
  }

  static authorizationError(): ErrorEnvelope {
    return new ErrorEnvelope("Unauthorized access", 401);
  }

  static validationError(): ErrorEnvelope {
    return new ErrorEnvelope("Request body failed validation", 400);
  }

  static tokenVerificationError(type: "refresh" | "access"): ErrorEnvelope {
    switch (type) {
      case "refresh":
        return new ErrorEnvelope(
          "Refresh token verification error",
          401,
          "/api/auth/refresh"
        );
      case "access":
        return new ErrorEnvelope(
          "Access token verification error",
          401,
          "/api/auth/access"
        );
    }
  }

  static recordMissingError(recordName: string): ErrorEnvelope {
    return new ErrorEnvelope(
      `${
        recordName.charAt(0).toUpperCase() + recordName.slice(1)
      } with given id doesn't exist.`,
      404
    );
  }
}
