import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { UserDataDto } from "../../../dtos/auth/UserData.dto";
import { UserData } from "../../../interfaces/auth/UserData";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { signToken } from "./signToken";

/**
 * Registers client with given username and password
 * @param req
 * @param res
 * @returns
 */
export async function registrationHandler(
  req: Request<{}, {}, UserDataDto>,
  res: Response,
  next: NextFunction
) {
  var username = req.body.username;

  // check if username already exists in database
  try {
    var result = await query<UserData>(
      selectAllConditionally("UserData", "username", username)
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  if (result.rows.length > 0) {
    // username already exists in database
    next(ErrorEnvelope.userCredentialsError());
    return;
  }

  var password = req.body.password;

  // generate refresh token
  const [refreshToken, refreshTokenId] = signToken("refresh", username);

  // add record to table
  try {
    await query<UserDataDto>(
      `INSERT INTO UserData(username, password, refreshtokenid) 
    VALUES ('${[username, password, refreshTokenId].join("', '")}');`
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // generate access token
  const [accessToken, accessTokenId] = signToken("access", username);

  //append cookies to resonse
  res
    .cookie("refresh", refreshToken, {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    })
    .cookie("access", accessToken, {
      signed: true,
      httpOnly: true,
      sameSite: "strict",
    })
    .send();
  return;
}
