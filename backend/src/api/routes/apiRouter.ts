import express from "express";
import toDoListRouter from "./toDoListRouter";
import authRouter from "./authRouter";

const apiRouter = express.Router();

apiRouter.use("/auth", authRouter);
apiRouter.use("/list", toDoListRouter);

export = apiRouter;
