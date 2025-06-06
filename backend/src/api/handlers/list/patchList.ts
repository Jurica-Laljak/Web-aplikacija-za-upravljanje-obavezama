import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { TokenAttributes } from "../../../interfaces/auth/TokenAttributes";
import { update } from "../../../database/queries/updateGeneric";
import { ToDoListInsert } from "../../../interfaces/list/ToDoListInsert";
import { AuthorizedAttributes } from "../../../interfaces/auth/authorizedAttributes/AuthorizedAttributes";
import anonymousQuery from "../../../database/anonymousQuery";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function patchList(
  req: Request,
  res: Response<{}, AuthorizedAttributes>,
  next: NextFunction
) {
  try {
    var updateObj = { ...req.body };
    console.log(Object.keys(updateObj));
    console.log(Object.values(updateObj));
    var queryStr = update<Partial<ToDoListInsert>>(
      "todolist",
      updateObj,
      ["listid", res.locals.listid],
      "*"
    );
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  try {
    await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send();
}
