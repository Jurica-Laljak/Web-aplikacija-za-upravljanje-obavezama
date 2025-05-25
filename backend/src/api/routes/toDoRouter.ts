import express from "express";
import { body, param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";
import { postTodo } from "../handlers/todo/postToDo";
import { patchTodo } from "../handlers/todo/patchToDo";
import { deleteTodo } from "../handlers/todo/deleteToDo";
import { authorizeToDo } from "../middleware/auth/authorizeToDo";
import { putToDoPrefixes } from "../handlers/todo/putToDoPrefixes";

const toDoRouter = express.Router();

toDoRouter.post(
  "/",
  body().exists().withMessage("Request body is empty"),
  throwIfError,
  postTodo
);

toDoRouter.patch(
  "/:todoid",
  param("todoid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  throwIfError,
  authorizeToDo("todoid"),
  throwIfError,
  patchTodo
);

toDoRouter.delete(
  "/:todoid",
  param("todoid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  throwIfError,
  authorizeToDo("todoid"),
  throwIfError,
  deleteTodo
);

toDoRouter.put(
  "/:todoid/prefix",
  param("todoid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  throwIfError,
  authorizeToDo("todoid"),
  throwIfError,
  putToDoPrefixes
);

export = toDoRouter;
