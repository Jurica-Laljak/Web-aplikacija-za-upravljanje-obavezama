import { NextFunction, Request, Response } from "express";
import { signToken } from "./signToken";
import { randomBytes } from "crypto";

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
) {
  // generate access cookie
  const accessToken = signToken(
    "access",
    req.params.username,
    req.params.userid,
    randomBytes(16).toString()
  );

  res.send({ access: accessToken }); //send token to user
}
