class ErrorEnvelope extends Error {
  errorCode: string;
  redirect?: string;

  constructor(message: string, errorCode?: number, redirect?: string) {
    super(message);

    if (errorCode) {
      this.errorCode = String(errorCode);
    } else {
      this.errorCode = "500";
    }

    if (redirect) {
      this.redirect = redirect;
    }
  }
}

export = ErrorEnvelope;
