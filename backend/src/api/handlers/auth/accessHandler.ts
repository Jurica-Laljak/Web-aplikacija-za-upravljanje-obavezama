import { NextFunction, Request, Response } from "express";

/**
 * Creates access token for client with correct refresh token
 * @param req
 * @param res
 * @returns
 */
export async function accessHandler(
  req: Request,
  res: Response,
  next: NextFunction
) {}
