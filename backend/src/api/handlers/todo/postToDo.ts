import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import { insert } from "../../../database/queries/insertGeneric";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import Prefix from "../../../interfaces/filter/PrefixFilter";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function postToDo(
  req: Request<{}, {}, ToDoInsert & { prefixes?: Prefix[] }>,
  res: Response<{ todoid: number }, TokenAttributes>,
  next: NextFunction
) {
  var listId = Number(req.params.listid);
  var toDoId = Number(req.params.todoid);
  try {
    var queryStr = insert<ToDoInsert>();
    var result = await query<{ todoid: number }>();
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }
  var rows = [...result];
}
