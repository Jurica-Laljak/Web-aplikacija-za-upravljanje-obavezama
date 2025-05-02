import express from "express";
import { getAllLists } from "../handlers/list/getAllLists";
import { postTodo } from "../handlers/list/postTodo";
import { getListContents } from "../handlers/list/getListContents";
import { patchList } from "../handlers/list/patchList";
import { deleteList } from "../handlers/list/deleteList";
import { body, param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";

const toDoListRouter = express.Router();

toDoListRouter.get("/", getAllLists);

toDoListRouter.get(
  "/:id",
  param("id")
    .exists()
    .withMessage("No id given.")
    .isNumeric()
    .withMessage("Invalid id"),
  throwIfError,
  getListContents
);

toDoListRouter.post(
  "/:listid",
  param("listid")
    .exists()
    .withMessage("No list id given.")
    .isNumeric()
    .withMessage("List id is not a number"),
  body().exists().withMessage("Request body is empty"),
  throwIfError,
  postTodo
);

toDoListRouter.patch("/:id", patchList);

toDoListRouter.delete("/:id", deleteList);

export = toDoListRouter;
