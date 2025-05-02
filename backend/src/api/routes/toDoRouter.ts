import express from "express";
import { param } from "express-validator";
import { throwIfError } from "../middleware/other/throwIfError";

const toDoRouter = express.Router();

export = toDoRouter;
