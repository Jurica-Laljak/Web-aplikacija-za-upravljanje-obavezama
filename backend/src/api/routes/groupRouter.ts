import express from "express";
import { body, param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";
import { createGroup } from "../handlers/group/createGroup";
import { patchGroup } from "../handlers/group/patchGroup";
import { deleteGroup } from "../handlers/group/deleteGroup";
import { authorizeGroup } from "../middleware/auth/authorizeGroup";
import { authorizeToDo } from "../middleware/auth/authorizeToDo";
import { addToGroup } from "../handlers/group/addToGroup";

const groupRouter = express.Router();

groupRouter.post(
  "/",
  body().exists().withMessage("Request body is empty"),
  throwIfError,
  createGroup
);

groupRouter.patch(
  "/:groupid",
  param("groupid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  throwIfError,
  authorizeGroup("groupid"),
  throwIfError,
  patchGroup
);

groupRouter.delete(
  "/:groupid",
  param("groupid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  throwIfError,
  authorizeGroup("groupid"),
  throwIfError,
  deleteGroup
);

groupRouter.put(
  "/:groupid/todo/:todoid",
  param("groupid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  param("todoid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  throwIfError,
  authorizeToDo("todoid"),
  addToGroup
);

export = groupRouter;
