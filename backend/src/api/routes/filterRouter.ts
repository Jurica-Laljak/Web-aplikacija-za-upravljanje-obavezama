import express from "express";
import { throwIfError } from "../middleware/other/throwIfError";
import { body, param } from "express-validator";
import { authorizeFilter } from "../middleware/auth/authorizeFIlter";
import { getAllFilters } from "../handlers/filter/getAllFilters";
import { postFilter } from "../handlers/filter/postFilter";
import { patchFilter } from "../handlers/filter/patchFIlter";
import { deleteFilter } from "../handlers/filter/deleteFilter";

const filterRouter = express.Router();

filterRouter.get("/", getAllFilters);

filterRouter.post(
  "/",
  body().exists().withMessage("Request body is empty"),
  body("type").exists().withMessage("Filter type undefined"),
  throwIfError,
  postFilter
);

filterRouter.patch(
  "/:filterid",
  param("filterid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  body("type").exists().withMessage("Filter type undefined"),
  throwIfError,
  authorizeFilter("filterid"),
  throwIfError,
  patchFilter
);

filterRouter.delete(
  "/:filterid",
  param("filterid")
    .exists()
    .withMessage("No todo id given.")
    .isInt()
    .withMessage("Id is not integer."),
  throwIfError,
  authorizeFilter("filterid"),
  throwIfError,
  deleteFilter
);

export = filterRouter;
