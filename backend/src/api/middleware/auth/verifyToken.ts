import { NextFunction, Request, Response } from "express";
import jwt from "jsonwebtoken";
import config from "../../../config";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import query from "../../../database/query";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { UserData } from "../../../interfaces/auth/UserData";
import { TokenType } from "../../../interfaces/type/TokenType";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";

export function verifyToken<T = any>(tokenType: TokenType) {
  //
  console.log("in verify token");
  //
  switch (tokenType) {
    case "access":
      return function (
        req: Request,
        res: Response<T, TokenAttributes>,
        next: NextFunction
      ) {
        //parse token
        const rawHeader = req.headers["authorization"]?.split(" ");
        var rawToken = "";
        if (rawHeader?.length == 2 && rawHeader[0] == "Bearer") {
          rawToken = rawHeader[1];
        } else {
          next(ErrorEnvelope.tokenVerificationError(tokenType));
          next();
        }
        console.log(rawToken);
        try {
          var token = jwt.verify(rawToken, config.JWT_ACCESS_KEY);
        } catch (err) {
          console.log(err);
          next(ErrorEnvelope.tokenVerificationError(tokenType));
          return;
        }

        //validating token
        if (
          typeof token !== "string" &&
          token.username &&
          token.userid &&
          token.type
        ) {
          const username = token.username;
          const userId = token.userid;
          const type = token.type;
          const currentTime = Math.floor(Date.now() / 1000);
          var expiryTime = config.JWT_ACCESS_EXPIRY;

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
            token.iss == config.ISSUER &&
            type == tokenType
          ) {
            res.locals.username = username;
            res.locals.userId = userId;
            next();
            return;
          } else {
            next(ErrorEnvelope.tokenVerificationError(tokenType));
            return;
          }
        }
      };
    case "refresh":
      return async function (req: Request, res: Response, next: NextFunction) {
        //parse token
        const rawHeader = req.headers["authorization"]?.split(" ");
        var rawToken = "";
        if (rawHeader?.length == 2 && rawHeader[0] == "Bearer") {
          rawToken = rawHeader[1];
        } else {
          next(ErrorEnvelope.tokenVerificationError(tokenType));
          next();
        }
        try {
          var token = jwt.verify(rawToken, config.JWT_REFRESH_KEY);
        } catch (err) {
          console.log(err);
          next(ErrorEnvelope.tokenVerificationError(tokenType));
          return;
        }

        //validating token
        if (
          typeof token !== "string" &&
          token.username &&
          token.userid &&
          token.type
        ) {
          const username = token.username;
          const userId = token.userid;
          const type = token.type;
          const currentTime = Math.floor(Date.now() / 1000);
          var expiryTime = config.JWT_REFRESH_EXPIRY;

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
            token.iss == config.ISSUER &&
            type == tokenType
          ) {
            try {
              //query database for user record
              var sqlRes = await query<UserData>(
                selectAllConditionally("UserData", [
                  "refreshtokenid",
                  token.jti,
                ])
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
              records[0].userid == userId &&
              token.jti == recordDecodedId
            ) {
              res.locals.username = username;
              res.locals.userId = userId;
              next();
              return;
            } else {
              //otherwise, token is incorrect
              next(ErrorEnvelope.tokenVerificationError(tokenType));
              return;
            }
          } else {
            next(ErrorEnvelope.tokenVerificationError(tokenType));
            return;
          }
        }
      };
  }
}
