import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { insert } from "../../../database/queries/insertGeneric";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import { selectAllConditionally } from "../../../database/queries/selectAll";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import ToDoList from "../../../interfaces/list/ToDoList";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function postTodo(
  req: Request,
  res: Response<{ todoid: number }, TokenAttributes>,
  next: NextFunction
) {
  var listId = Number(req.params.listid);

  // check if user has authority to access given list
  try {
    var result = await query<ToDoList>(
      selectAllConditionally(
        "todolist",
        ["userid", res.locals.userId],
        ["listid", listId]
      )
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }
  if (result.rows.length == 0) {
    next(ErrorEnvelope.authorizationError());
    return;
  }

  // validate request body
  try {
    var insertObj = { ...req.body, listid: listId };
    console.log(Object.keys(insertObj));
    console.log(Object.values(insertObj));
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
    var result2 = await query<{ todoid: number }>(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  // return todo id
  var rows2 = [...result2];
  res.send(rows2[0]);
}
