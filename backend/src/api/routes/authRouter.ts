import express from "express";
import { registrationHandler } from "../handlers/auth/registrationHandler";
import { refreshHandler } from "../handlers/auth/refreshHandler";
import { accessHandler } from "../handlers/auth/accessHandler";
import { body, cookie, header } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";
import { verifyToken } from "../middleware/auth/verifyToken";

const authRouter = express.Router();

authRouter.post(
  "/register",
  body("username")
    .notEmpty()
    .withMessage("Username not provided")
    .isString()
    .isLength({ min: 5, max: 18 })
    .withMessage("Username length incorrect"),
  body("password")
    .notEmpty()
    .withMessage("Password not provided")
    .isString()
    .isLength({ min: 10, max: 40 })
    .withMessage("Password length incorrect"),
  throwIfError,
  registrationHandler
);

authRouter.post(
  "/refresh",
  body("username")
    .notEmpty()
    .withMessage("Username not provided")
    .isString()
    .isLength({ min: 5, max: 18 })
    .withMessage("Username length incorrect"),
  body("password")
    .notEmpty()
    .withMessage("Password not provided")
    .isString()
    .isLength({ min: 10, max: 40 })
    .withMessage("Password length incorrect"),
  throwIfError,
  refreshHandler
);

authRouter.post(
  "/access",
  header("Authorization").exists().withMessage("No authorization provided"),
  throwIfError,
  verifyToken("refresh"),
  accessHandler
);

export = authRouter;
