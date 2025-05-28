import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import query from "../../../database/query";
import { UserData } from "../../../interfaces/auth/UserData";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { signToken } from "./signToken";
import anonymousQuery from "../../../database/anonymousQuery";
import { UserDataCore } from "../../../../../shared/auth/UserDataCore";
import { randomBytes } from "crypto";
import { UserTokens } from "../../../../../shared/auth/UserData.dto";

/**
 * Creates refresh token for client with correct credentials
 * @param req
 * @param res
 * @returns
 */
export async function refreshHandler(
  req: Request<{}, {}, UserDataCore>,
  res: Response<UserTokens>,
  next: NextFunction
) {
  var username = req.body.username;
  var password = req.body.password;

  // check if username already exists in database
  try {
    var sqlRes = await query<UserData>(
      selectAllConditionally("UserData", ["username", username])
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  const rows = [...sqlRes];
  if (sqlRes.rows.length == 1 && rows[0].password == password) {
    // checking if user exists and client has proper authentication
    var tokenId = randomBytes(16).toString();
    try {
      // update refreshtokenid in database
      await anonymousQuery(`UPDATE UserData 
        SET refreshtokenid = '${tokenId}'
        WHERE UserData.userid = '${rows[0].userid}'`);
    } catch (err) {
      console.log(err);
      next(ErrorEnvelope.databaseError());
      return;
    }

    //generate refresh token
    const refreshToken = signToken(
      "refresh",
      username,
      rows[0].userid,
      tokenId
    );

    // generate access token
    const accessToken = signToken(
      "access",
      username,
      rows[0].userid,
      randomBytes(16).toString()
    );

    res.send({ refresh: refreshToken, accesstoken: accessToken }); //send tokens to user
  } else {
    // failed authentication
    next(ErrorEnvelope.userCredentialsError());
    return;
  }
}
