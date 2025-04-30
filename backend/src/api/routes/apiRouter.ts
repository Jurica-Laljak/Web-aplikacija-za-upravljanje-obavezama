import express from "express";
import { verifyToken } from "../middleware/auth/verifyToken";
import { header } from "express-validator";
import toDoListRouter from "./toDoListRouter";
import authRouter from "./authRouter";
import toDoRouter from "./toDoRouter";
import groupRouter from "./groupRouter";
import filterRouter from "./filterRouter";

const apiRouter = express.Router();

// authenitcation routes are not secured by authorization tokens
apiRouter.use("/auth", authRouter);

// all other routes are secured by authorization tokens
apiRouter.use(
  "/list",
  header("Authorization").notEmpty().withMessage("No JWT provided."),
  verifyToken("access"),
  toDoListRouter
);
apiRouter.use(
  "/todo",
  header("Authorization").notEmpty().withMessage("No JWT provided."),
  verifyToken("access"),
  toDoRouter
);
apiRouter.use(
  "/group",
  header("Authorization").notEmpty().withMessage("No JWT provided."),
  verifyToken("access"),
  groupRouter
);
apiRouter.use(
  "/filter",
  header("Authorization").notEmpty().withMessage("No JWT provided."),
  verifyToken("access"),
  filterRouter
);

export = apiRouter;
