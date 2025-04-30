import { TokenType } from "../../../interfaces/other/TokenType";
import config from "../../../config";
import jwt from "jsonwebtoken";
import { randomBytes } from "crypto";
import { copyFile } from "fs";

/**
 * Signs token for user with given username
 * @param req
 * @param res
 * @returns {[string, string]} [signed token, token id]
 */
export function signToken(
  tokenType: TokenType,
  username: string
): [string, string] {
  const tokenId = randomBytes(16).toString(); //unique token id

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

  return [
    jwt.sign({ username: username }, signKey, {
      jwtid: tokenId,
      issuer: config.ISSUER, //issuer = current domain
      expiresIn: expiryTime,
    }),
    tokenId,
  ];
}
