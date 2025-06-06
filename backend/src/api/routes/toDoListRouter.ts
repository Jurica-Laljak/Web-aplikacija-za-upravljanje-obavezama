import express from "express";
import { getAllLists } from "../handlers/list/getAllLists";
import { getListAndContents } from "../handlers/list/getListContents";
import { patchList } from "../handlers/list/patchList";
import { deleteList } from "../handlers/list/deleteList";
import { body, param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";
import { postList } from "../handlers/list/postList";
import { authorizeList } from "../middleware/auth/authorizeList";

const toDoListRouter = express.Router();

toDoListRouter.get("/", getAllLists);

toDoListRouter.get(
  "/:listid",
  param("listid")
    .exists()
    .withMessage("No id given.")
    .isNumeric()
    .withMessage("Invalid id"),
  throwIfError,
  authorizeList("listid"),
  getListAndContents
);

toDoListRouter.post(
  "/",
  body().exists().withMessage("Request body is empty"),
  throwIfError,
  postList
);

toDoListRouter.patch(
  "/:listid",
  param("listid")
    .exists()
    .withMessage("No id given.")
    .isNumeric()
    .withMessage("Invalid id"),
  throwIfError,
  authorizeList("listid"),
  patchList
);

toDoListRouter.delete(
  "/:listid",
  param("listid")
    .exists()
    .withMessage("No id given.")
    .isNumeric()
    .withMessage("Invalid id"),
  throwIfError,
  authorizeList("listid"),
  deleteList
);

export = toDoListRouter;
