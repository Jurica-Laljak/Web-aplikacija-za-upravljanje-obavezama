import { TokenType } from "../../../interfaces/type/TokenType";
import config from "../../../config";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";

/**
 * Signs token for user with given username
 * @param req
 * @param res
 * @returns {string}
 */
export function signToken(
  tokenType: TokenType,
  username: string,
  userid: number | string,
  tokenId: string
): string {
  var signKey: string, expiryTime: number;
  switch (tokenType) {
    case "refresh":
      signKey = config.JWT_REFRESH_KEY;
      expiryTime = config.JWT_REFRESH_EXPIRY;
      break;
    case "access":
      signKey = config.JWT_ACCESS_KEY;
      expiryTime = config.JWT_ACCESS_EXPIRY;
      break;
  }

  return jwt.sign(
    { type: tokenType, username: username, userid: userid },
    signKey,
    {
      jwtid: tokenId,
      issuer: config.ISSUER, //issuer = current domain
      expiresIn: expiryTime,
    }
  );
}
