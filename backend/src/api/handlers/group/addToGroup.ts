import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { insert } from "../../../database/queries/insertGeneric";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import { ToDoDto } from "../../../dtos/todo/ToDo.dto";
import { AuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/AuthorizedAttributes";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function addToGroup(
  req: Request,
  res: Response<ToDoDto, AuthorizedAttributes>,
  next: NextFunction
) {}
