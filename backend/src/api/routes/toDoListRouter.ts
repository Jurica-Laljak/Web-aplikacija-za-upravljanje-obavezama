import express from "express";
import { getAllLists } from "../handlers/list/getAllLists";
import { getListContents } from "../handlers/list/getListContents";
import { patchList } from "../handlers/list/patchList";
import { deleteList } from "../handlers/list/deleteList";
import { body, param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";
import { postList } from "../handlers/list/postList";

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
  getListContents
);

toDoListRouter.post(
  "/",
  body().exists().withMessage("Request body is empty"),
  throwIfError,
  postList
);

toDoListRouter.patch("/:listid", patchList);

toDoListRouter.delete("/:listid", deleteList);

export = toDoListRouter;
