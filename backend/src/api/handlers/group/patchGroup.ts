import { NextFunction, Request, Response } from "express";
import query from "../../../database/query";
import { ErrorEnvelope } from "../../../interfaces/other/ErrorEnvelope";
import { insert } from "../../../database/queries/insertGeneric";
import { ToDoInsert } from "../../../interfaces/todo/ToDoInsert";
import { ToDoDto } from "../../../dtos/todo/ToDo.dto";
import { AuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/AuthorizedAttributes";
import { ToDoGroupInsert } from "../../../interfaces/group/ToDoGroupInsert";
import { update } from "../../../database/queries/updateGeneric";
import anonymousQuery from "../../../database/anonymousQuery";
import { GroupAuthorizedAttributes } from "../../../interfaces/auth/Authorized Attributes/GroupAuthorizedAttributes";

/**
 *
 * @param req
 * @param res
 * @returns
 */
export async function patchGroup(
  req: Request,
  res: Response<ToDoDto, GroupAuthorizedAttributes>,
  next: NextFunction
) {
  // validate request body
  try {
    var updateObj = { ...req.body };
    console.log(Object.keys(updateObj));
    console.log(Object.values(updateObj));
    var queryStr = update<Partial<ToDoGroupInsert>>("todogroup", updateObj, [
      "groupid",
      res.locals.groupid,
    ]);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.validationError());
    return;
  }

  // update group data
  try {
    await anonymousQuery(queryStr);
  } catch (err) {
    console.log(err);
    next(ErrorEnvelope.databaseError());
    return;
  }

  res.send();
}
