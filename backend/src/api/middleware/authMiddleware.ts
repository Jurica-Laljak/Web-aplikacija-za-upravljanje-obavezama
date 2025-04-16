import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import jwt from "jsonwebtoken";
import ErrorEnvelope from "../../interfaces/other/ErrorEnvelope";
import config from "../../config";

export function verifyJWT(
  req: Request,
  res: Response<ErrorEnvelope>,
  next: NextFunction
) {
  const result = validationResult(req);
  var token = req.headers["Authorization"]?.toString().split(" ")[1];

  if (result.array().length == 0 && token) {
    res.sendStatus(401);
    jwt.verify(token, config.JWT_KEY, {});
  } else {
    res
      .set("WWW-Authenticate", "Bearer")
      .status(401)
      .send({
        errors: result.array().map((err) => err.msg),
        redirect: "/api/login",
      });
    return;
  }
}
