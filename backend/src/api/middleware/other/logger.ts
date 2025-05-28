import { NextFunction, Request, Response } from "express";

export function logger(req: Request, res: Response, next: NextFunction) {
  console.log(
    [
      "/api" + req.url,
      req.method,
      JSON.stringify(req.query),
      JSON.stringify(req.headers),
      JSON.stringify(req.body),
    ].join(" | ") + "\n"
  );

  next();
}
