interface ErrorEnvelope {
  errStatusCode: number;
  errMessage: string;
  response: Object[] | Object | null;
}

export = ErrorEnvelope;
