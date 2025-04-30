import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";

export function throwIfError(req: Request, res: Response, next: NextFunction) {
  const result = validationResult(req);
  const lastMessage = result.array().shift(); //fetch earliest message
  if (lastMessage) {
    throw new ErrorEnvelope(lastMessage.msg, 401);
  }

  next(); //otherwise, continue
}
