import express from "express";
import { param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";
import { postToDo } from "../handlers/todo/postToDo";

const toDoRouter = express.Router();

toDoRouter.post(
  "/:listid-:todoid",
  param("listid")
    .exists()
    .withMessage("No list id given.")
    .isNumeric()
    .withMessage("List id is not a number"),
  param("todoid")
    .exists()
    .withMessage("No todo id given.")
    .isNumeric()
    .withMessage("Todo id is not a number"),
  throwIfError,
  postToDo
);

export = toDoRouter;
