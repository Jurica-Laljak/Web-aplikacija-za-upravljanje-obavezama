import express from "express";
import { verifyToken } from "../middleware/auth/verifyToken";
import { header, param } from "express-validator";
import toDoListRouter from "./toDoListRouter";
import authRouter from "./authRouter";
import toDoRouter from "./toDoRouter";
import groupRouter from "./groupRouter";
import filterRouter from "./filterRouter";
import { throwIfError } from "../middleware/other/throwIfError";
import { authorizeList } from "../middleware/auth/authorizeList";

const apiRouter = express.Router();

// authenitcation routes are not secured by authorization tokens
apiRouter.use("/auth", authRouter);

// all other routes are secured by authorization tokens
apiRouter.use(
  "/user",
  header("Authorization").exists().withMessage("No authorization provided"),
  throwIfError,
  verifyToken("access"),
  toDoListRouter
);
apiRouter.use(
  "/list",
  header("Authorization")
    .exists()
    .withMessage("No authorization header provided"),
  throwIfError,
  verifyToken("access"),
  toDoListRouter
);
apiRouter.use(
  "/todo/:listid",
  header("Authorization").exists().withMessage("No authorization provided"),
  param("listid")
    .exists()
    .withMessage("No list id provided")
    .isInt()
    .withMessage("Provided list id is not an integer"),
  throwIfError,
  verifyToken("access"),
  authorizeList("listid"),
  toDoRouter
);
apiRouter.use(
  "/group/:listid",
  header("Authorization").exists().withMessage("No authorization provided"),
  throwIfError,
  verifyToken("access"),
  authorizeList("listid"),
  groupRouter
);
apiRouter.use(
  "/filter",
  header("Authorization").exists().withMessage("No authorization provided"),
  throwIfError,
  verifyToken("access"),
  filterRouter
);

export = apiRouter;
