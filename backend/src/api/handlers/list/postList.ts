import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import { ToDoDto } from "../../../../../shared/todo/ToDo.dto";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function postList(
  req: Request,
  res: Response<ToDoDto, TokenAttributes>,
  next: NextFunction
) {}
