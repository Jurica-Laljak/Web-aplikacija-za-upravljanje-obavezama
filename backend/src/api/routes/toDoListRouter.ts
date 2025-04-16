import express, { Request, Response } from "express";
import { getList, getLists, putList } from "../handlers/list/ToDoList";

const toDoListRouter = express.Router();

toDoListRouter.get("/", getLists);

toDoListRouter.put("/", putList);

toDoListRouter.get("/:id", getList);

export = toDoListRouter;
