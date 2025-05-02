import express from "express";
import { getAllLists } from "../handlers/list/getAllLists";
import { postList } from "../handlers/list/postList";
import { getListContents } from "../handlers/list/getListContents";
import { patchList } from "../handlers/list/patchList";
import { deleteList } from "../handlers/list/deleteList";
import { param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";

const toDoListRouter = express.Router();

toDoListRouter.get("/", getAllLists);

toDoListRouter.post("/", postList);

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

toDoListRouter.patch("/:id", patchList);

toDoListRouter.delete("/:id", deleteList);

export = toDoListRouter;
