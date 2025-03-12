import express from "express";
import toDoListRouter from "./list/toDoListRouter";

const apiRouter = express.Router();

apiRouter.use("/todo", toDoListRouter);

apiRouter.get("/", (req, res, next) => {});

export = apiRouter;
