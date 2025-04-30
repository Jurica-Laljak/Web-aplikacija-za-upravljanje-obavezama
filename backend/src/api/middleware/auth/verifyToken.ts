import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import query from "../../../database/query";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { UserData } from "../../../interfaces/auth/UserData";
import { TokenType } from "../../../interfaces/other/TokenType";

export function verifyToken(tokenType: TokenType) {
  return async function (req: Request, res: Response, next: NextFunction) {
    //parse token
    const cookie = req.signedCookies["refresh"];
    if (tokenType == "refresh") {
      var token = jwt.verify(cookie, config.JWT_REFRESH_KEY);
    } else {
      //"access"
      var token = jwt.verify(cookie, config.JWT_ACCESS_KEY);
    }

    //validating token
    if (typeof token !== "string" && token.username) {
      const username = token.username;
      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenType == "refresh") {
        var expiryTime = config.JWT_REFRESH_EXPIRY;
      } else {
        //"access"
        var expiryTime = config.JWT_ACCESS_EXPIRY;
      }

      //check if all fields exist and if issuing and expiry times
      //are sensible
      if (
        token.iat &&
        token.exp &&
        token.iss &&
        token.jti &&
        token.iat > currentTime - expiryTime &&
        token.iat < currentTime &&
        token.exp > currentTime &&
        token.iss == config.ISSUER
      ) {
        if (tokenType == "access") {
          next(); //access token is validated
          return;
        } else {
          //"refresh" token validation requires checking database

          try {
            //query database for user record
            var sqlRes = await query<UserData>(
              selectAllConditionally("UserData", "refreshtokenid", token.jti)
            );
          } catch (err) {
            console.log(err);
            next(ErrorEnvelope.databaseError());
            return;
          }

          var records = [...sqlRes];
          var recordDecodedId = new TextDecoder().decode(
            records[0].refreshtokenid
          );
          //if record exists, the queried username and token id are the same as
          //provided, a new access token is generated
          if (
            sqlRes.rows.length == 1 &&
            records[0].username == username &&
            token.jti == recordDecodedId
          ) {
            next();
            return;
          } else {
            //otherwise, token is incorrect
            next(ErrorEnvelope.tokenVerificationError(tokenType));
            return;
          }
        }
      } else {
        next(ErrorEnvelope.tokenVerificationError(tokenType));
        return;
      }
    }
  };
}
