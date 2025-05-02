import express from "express";
import { getUserData } from "../handlers/user/getUserData";
import { patchUserData } from "../handlers/user/patchUserData";

const userRouter = express.Router();

userRouter.get("/", getUserData);

userRouter.patch("/", patchUserData);

export = userRouter;
