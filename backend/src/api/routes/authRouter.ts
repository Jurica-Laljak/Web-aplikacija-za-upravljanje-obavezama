import express from "express";
import { loginHandler } from "../handlers/authentication";

const authRouter = express.Router();

authRouter.get("/login", loginHandler);

export = authRouter;
