import express from "express";
import { verifyToken } from "../middleware/auth/verifyToken";
import { header } from "express-validator";
import toDoListRouter from "./toDoListRouter";
import authRouter from "./authRouter";
import toDoRouter from "./toDoRouter";
import groupRouter from "./groupRouter";
import filterRouter from "./filterRouter";
import { throwIfError } from "../middleware/other/throwIfError";

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
  header("Authorization").exists().withMessage("No authorization provided"),
  throwIfError,
  verifyToken("access"),
  toDoListRouter
);
apiRouter.use(
  "/todo",
  header("Authorization").exists().withMessage("No authorization provided"),
  throwIfError,
  verifyToken("access"),
  toDoRouter
);
apiRouter.use(
  "/group",
  header("Authorization").exists().withMessage("No authorization provided"),
  throwIfError,
  verifyToken("access"),
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
