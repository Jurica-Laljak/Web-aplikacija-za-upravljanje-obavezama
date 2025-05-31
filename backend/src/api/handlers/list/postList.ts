import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import { ToDoDto } from "../../../../../shared/todo/ToDo.dto";
import { insert } from "../../../database/queries/insertGeneric";
import { ToDoListInsert } from "../../../interfaces/list/ToDoListInsert";
import { ToDoList } from "../../../interfaces/list/ToDoList";
import { ToDoListDto } from "../../../../../shared/list/ToDoList.dto";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function postList(
  req: Request,
  res: Response<ToDoListDto, TokenAttributes>,
  next: NextFunction
) {
  try {
    var insertObj = { ...req.body, userid: res.locals.userId };
    var queryStr = insert<ToDoListInsert>("todolist", insertObj, "*");
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  try {
    var result2 = await query<Required<ToDoList>>(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // return group id
  var rows2 = [...result2];
  res.send({ ...rows2[0], groups: [], todos: [] });
}
