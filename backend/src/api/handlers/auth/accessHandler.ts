import { NextFunction, Request, Response } from "express";
import { signToken } from "./signToken";
import { randomBytes } from "crypto";
import { UserAccessToken } from "../../../../../shared/auth/UserData.dto";

/**
 * Creates access token for client with correct refresh token
 * @param req
 * @param res
 * @returns
 */
export async function accessHandler(
  req: Request,
  res: Response<UserAccessToken>,
  next: NextFunction
) {
  // generate access cookie
  const accessToken = signToken(
    "access",
    req.params.username,
    req.params.userid,
    randomBytes(16).toString()
  );

  res.send({ accesstoken: accessToken }); //send token to user
}
