import { NextFunction, Request, Response } from "express";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import { update } from "../../../database/queries/updateGeneric";
import { AuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/AuthorizedAttributes";
import anonymousQuery from "../../../database/anonymousQuery";
import { ToDoAuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/ToDoAuthorizedAttributes";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function patchTodo(
  req: Request,
  res: Response<{}, ToDoAuthorizedAttributes>,
  next: NextFunction
) {
  // validate request body
  try {
    var updateObj = { ...req.body };
    console.log(Object.keys(updateObj));
    console.log(Object.values(updateObj));
    var queryStr = update<Partial<ToDoInsert>>(
      "todo",
      updateObj,
      ["todoid", res.locals.todoid],
      "*"
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  console.log(queryStr);
  // insert into todo
  try {
    await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send();
}
