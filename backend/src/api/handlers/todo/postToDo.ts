import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { insert } from "../../../database/queries/insertGeneric";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import { ToDoDto } from "../../../dtos/todo/ToDo.dto";
import { AuthorizedAttributes } from "../../../interfaces/auth/AuthorizedAttributes";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function postTodo(
  req: Request,
  res: Response<ToDoDto, AuthorizedAttributes>,
  next: NextFunction
) {
  // validate request body and create SQL query
  try {
    var insertObj = { ...req.body, listid: res.locals.listid };
    var queryStr = insert<ToDoInsert & { listid: number }>(
      "todo",
      insertObj,
      "*"
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // insert into todo
  try {
    var result2 = await query<ToDoDto>(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // return todo id
  var rows2 = [...result2];
  res.send(rows2[0]);
}
